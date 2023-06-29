import { Entity, extend } from "playcanvas";
import { Game } from "../game";



export class box extends Entity {
    constructor() {
        super()
        this.speed = 0.3; // Tốc độ di chuyển của hộp
        this.createMateria()
        this.box = new pc.Entity("cube");
        this.box.addComponent("render", {
            type: "box",
            material: this.material,
        });
        this.box.setLocalScale(0.25, 0.035, 0.25);
        this.box.setLocalPosition(-(this.box.getLocalScale().x + this.box.getLocalScale().x * 0.20), 0.5, 0)
        //this.box.setPosition(0, 0.5, -(this.box.getLocalScale().x + this.box.getLocalScale().x * 0.20))
        this.addChild(this.box)
        this.moveLeft = false
        this.moveDown = true
        this.moveRight = true
        this.moveUp = false
        this.shouldChangeDirection = true
        this.update()
        Game.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }
    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color(68 / 255, 210 / 255, 191 / 255);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;
        this.material.update();
    }

    onKeyUp(event) {
        if (event.key === pc.KEY_UP || event.key === pc.KEY_W) {
            this.moveUp = false
        } else if (event.key === pc.KEY_DOWN || event.key === pc.KEY_S) {
            this.moveDown = false
        } else if (event.key === pc.KEY_LEFT || event.key === pc.KEY_A) {
            this.moveLeft = false
        } else if (event.key === pc.KEY_RIGHT || event.key === pc.KEY_D) {
            this.moveRight = false
        }
    }
    // onMouseDown() {
    //     this.moveLeft = false
    //     this.moveDown = false
    //     this.moveRight = false
    //     this.moveUp = false
    //     this.shouldChangeDirection = false;

    // }
    update(dt) {
        Game.app.on("update", (dt) => {
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
                const screenBounds = this.box.getLocalScale().x + this.box.getLocalScale().x * 0.25; // Giới hạn màn hình

                if (position.x >= screenBounds || position.x <= -screenBounds || position.z >= screenBounds || position.z <= -screenBounds) {
                    this.moveLeft = !this.moveLeft;
                    this.moveDown = !this.moveDown;
                    this.moveRight = !this.moveRight;
                    this.moveUp = !this.moveUp;


                }
            }
        });



    }

}