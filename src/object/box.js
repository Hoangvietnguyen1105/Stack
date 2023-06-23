import { Entity, extend } from "playcanvas";
import { Game } from "../game";



export class box extends Entity {
    constructor() {
        super()
        this.speed = 0.1; // Tốc độ di chuyển của hộp
        this.createMateria()
        this.box = new pc.Entity("cube");
        this.box.addComponent("render", {
            type: "box",
            material: this.material,
        });
        this.box.setPosition(0, 0.5, 0)
        this.box.setLocalScale(0.5, 0.05, 0.5);

        Game.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
        Game.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);

    }
    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color(68 / 255, 210 / 255, 191 / 255);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;
        // material.diffuseMap = assets.color.resource;
        // material.normalMap = assets.normal.resource;
        // material.glossMap = assets.gloss.resource;
        // material.diffuseMapTiling.set(7, 7);
        // material.normalMapTiling.set(7, 7);
        // material.glossMapTiling.set(7, 7);
        this.material.update();
    }
    onKeyDown(event) {

        // Kiểm tra phím được nhấn và thiết lập hướng di chuyển tương ứng
        if (event.key === pc.KEY_UP || event.key === pc.KEY_W) {
            this.moveUp = true
        } else if (event.key === pc.KEY_DOWN || event.key === pc.KEY_S) {
            this.moveDown = true
        } else if (event.key === pc.KEY_LEFT || event.key === pc.KEY_A) {
            this.moveLeft = true
        } else if (event.key === pc.KEY_RIGHT || event.key === pc.KEY_D) {
            this.moveRight = true
        }

        // Kiểm tra nếu có hướng di chuyển, thì cập nhật vị trí mới cho đối tượng

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
    update(dt) {
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
            direction.normalize().scale(this.speed); // Chuẩn hóa và nhân với tốc độ
            this.box.translate(direction); // Di chuyển đối tượng
        }

    }

}