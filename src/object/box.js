import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";


export class Box extends Entity {
    constructor() {
        super()
        this.speed = Config.box['speed']; // Tốc độ di chuyển của hộp
        this.createMateria()
        this.box = new pc.Entity("cube");
        this.box.addComponent("render", {
            type: "box",
            material: this.material,
        });
        this.box.setLocalScale(Config.box['scaleX'], Config.box['scaleY'], Config.box['scaleZ']);
        this.box.setLocalPosition(-0.3, 0.5, 0)
        this.addChild(this.box)


        this.moveLeft = false
        this.moveDown = true
        this.moveRight = true
        this.moveUp = false
        this.shouldChangeDirection = true

        Game.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }
    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color().fromString(Config.color1['firstColor']);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;
        this.material.update();


    }

    update(dt) {
        if (!dt) {
            return
        }
        //Game.app.on("update", (dt) => {
        // this.box.box.rotate(10 * dt, 20 * dt, 30 * dt)
        const direction = new pc.Vec3(); // Hướng di chuyển
        if (this.moveUp) {
            direction.z = -1; // Di chuyển lên
        }
        if (this.moveDown) {
            direction.z = 1; // Di chuyển xuống
        }
        if (this.moveLeft) {
            direction.x = -1; // Di chuyển sang trái
        }
        if (this.moveRight) {
            direction.x = 1; // Di chuyển sang phải
        }
        var rX = Math.cos(-Math.PI * 0.25);
        var rY = Math.sin(-Math.PI * 0.25);
        direction.set(direction.x * rX - direction.z * rY, 0, direction.z * rX + direction.x * rY);

        if (direction.length() > 0) {
            direction.normalize().scale(this.speed * dt); // Chuẩn hóa và nhân với tốc độ
            this.box.translate(direction); // Di chuyển đối tượng
        }
        if (this.shouldChangeDirection) {
            const position = this.box.getPosition();
            // const screenBounds = this.box.getLocalScale().x + this.box.getLocalScale().x * 0.25; // Giới hạn màn hình
            const screenBounds = 0.3125
            if (position.x >= screenBounds || position.x <= -screenBounds || position.z >= screenBounds || position.z <= -screenBounds) {
                this.moveLeft = !this.moveLeft;
                this.moveDown = !this.moveDown;
                this.moveRight = !this.moveRight;
                this.moveUp = !this.moveUp;

            }
        }
        // });



    }
    destroy() {
        super.destroy()
    }

}