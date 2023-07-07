
import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";
import { LogicPlayScene } from "../logic/logicPlay.js";
import { Loader } from "../assetLoader/Loader.js";
export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {

        if (this.boxUpdate) {
            this.boxUpdate.update(dt)
        }
        if (this.camera.camera.getPosition().y < this.temp) {
            this.camera.camera.setPosition(this.camera.camera.getPosition().x, Math.min(this.camera.camera.getPosition().y + 0.2 * dt, this.temp), this.camera.camera.getPosition().z)
        }
    }

    _initialize() {
        this._initLight();
        this._initBox();
        this.boxUpdate = this.box
        this._initCamera();
        this.update()
        this.change = true
        this.temp2 = this.box.box.getPosition().y
        this.oldBox = this.box
        this.boxLoop = this.box
        this.gameEnd = false
        this.colorHex = '#5adeff'
    }

    onMouseDown() {
        const box2 = new Box();
        this.boxUpdate = box2;
        this.temp = this.camera.camera.getPosition().y + box2.box.getLocalScale().y;
        this.temp2 += box2.box.getLocalScale().y;
        if (this.change === true) {
            box2.box.setLocalPosition(
                0,
                0.5,
                -(box2.box.getLocalScale().z + box2.box.getLocalScale().z * 0.20)
            );
            box2.moveLeft = true;
            box2.moveRight = false;
        }
        box2.box.setLocalPosition(
            box2.box.getPosition().x,
            this.temp2,
            box2.box.getPosition().z
        );
        const color = new pc.Color().fromString(this.colorHex);
        box2.material.diffuse = color;

        var boxStay = new Box();
        var boxFall = new Box();
        // Split box
        this.gameEnd = LogicPlayScene.splitPlane(
            boxStay,
            boxFall,
            this.change,
            this.oldBox,
            this.oldoldbox,
            this.temp2
        );

        if (this.gameEnd) {
            boxFall = this.oldBox;
            setTimeout(() => {
                Game.replay();
                return;
            }, 1500);
        }

        if (this.change === true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale());
            box2.box.setLocalPosition(
                boxStay.box.getPosition().x,
                boxStay.box.getPosition().y + boxStay.box.getLocalScale().y,
                -(boxStay.box.getPosition().z + boxStay.box.getPosition().z + (boxStay.box.getLocalScale().z * 0.2))
            );
        }
        if (this.change !== true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale());
            box2.box.setLocalPosition(
                -(boxStay.box.getPosition().x + boxStay.box.getPosition().x + (boxStay.box.getLocalScale().x * 0.2)),
                boxStay.box.getPosition().y + boxStay.box.getLocalScale().y,
                boxStay.box.getPosition().z
            );
        }

        boxStay.moveLeft = false;
        boxStay.moveDown = false;
        boxStay.moveRight = false;
        boxStay.moveUp = false;
        boxStay.shouldChangeDirection = false;
        boxStay.material.diffuse = this.oldBox.material.diffuse;
        boxFall.material.diffuse = this.oldBox.material.diffuse;

        this.removeChild(this.oldBox);
        if (!this.gameEnd) {
            this.addChild(box2);
            this.addChild(boxStay);
        }
        this.addChild(boxFall);

        // Add physics
        setTimeout(() => {
            this.physics(boxFall, 'dynamic');
        }, 120);
        this.physics(boxStay, 'static');

        this.boxLoop = box2;
        this.oldoldbox = boxStay;
        this.oldBox = box2;

        this.change = !this.change;

        // Đậm dần màu của box2
        this.colorHex = this._darkerColor(this.colorHex);
    }

    physics(box, type) {

        box.box.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(box.box.getLocalScale().x / 2, box.box.getLocalScale().y / 2, box.box.getLocalScale().z / 2), // Kích thước của vùng va chạm thu nhỏ
        });
        box.box.addComponent("rigidbody", {
            type: type,
            mass: 50,
            restitution: 0.5,
        });
    }

    _darkerColor(hexColor) {
        const colorValue = parseInt(hexColor.substring(1), 16);
        var R = (colorValue >> 16) & 255;
        var G = (colorValue >> 8) & 255;
        var B = colorValue & 255;
        // Điều chỉnh giá trị bước giảm màu
        if (G > 90) {
            console.log(G)
            console.log(Math.max(this._tintColor(G, 'G'), 90))

            G = Math.max(this._tintColor(G, 'G'), 90)
        }
        else if (R < 255) {
            R = Math.min(255, this._tintColor(R, 'R'))
        }
        else if (B > 90) {
            B = Math.max(this._tintColor(B, 'B'), 90)
        }
        const darkerValue = (R << 16) | (G << 8) | B;
        return '#' + darkerValue.toString(16).padStart(6, '0');
    }
    _tintColor(RGB, color) {
        if (color === 'G') {
            return RGB - 8
        }
        else if (color === 'R') {
            return RGB + 8
        }
        else if (color === 'B') {
            return RGB - 8
        }
    }

    _initBox() {

        this.box = new Box();
        this.boxUpdate = this.box
        this.box.material.diffuse = new pc.Color().fromString('#5adeff');
        this.change = true;
        this.addChild(this.box);

        this.lct = 0 - this.box.box.getLocalScale().y;
        this.hexColor = '#5af7ff';
        this.colorStep = -30;

        for (var i = 0; i < 30; i++) {
            var box3 = new Box();
            this.addChild(box3);

            box3.material.diffuse = new pc.Color().fromString(this.hexColor);
            this.hexColor = this._darkerColor(this.hexColor)
            box3.moveDown = false;
            box3.moveLeft = false;
            box3.moveUp = false;
            box3.moveRight = false;

            box3.setLocalPosition(box3.box.getLocalScale().x + box3.box.getLocalScale().x * 0.20, this.lct, 0);
            this.lct -= box3.box.getLocalScale().y;

            // Giảm giá trị màu theo colorStep

            this.oldoldbox = box3
            this.physics(box3, 'static')
        }
    }
    _initCamera() {
        this.camera = new Camera()
        this.addChild(this.camera.camera);
    }
    _initLight() {
        this.light = new Light()
        this.light.light.setLocalEulerAngles(85.63, -58.9, -126.06)
        this.light.light.setLocalPosition(-0.19, 1.0613877773284912, -0.13);
        this.light.light.set
        this.addChild(this.light.light);
    }
}