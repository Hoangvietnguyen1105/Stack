
import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";
import { LogicPlayScene } from "../logic/splitBox.js";
import { Loader } from "../assetLoader/Loader.js";
import { Color } from "../logic/randomColor.js";
export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {
        if (this.countUp > 0) {
            this.scaleUp()
            this.countUp--;
        }
        if (this.boxUpdate) {
            this.boxUpdate.update(dt)
        }
        if (this.camera.camera.getPosition().y < this.CamPosition) {
            this.camera.camera.setPosition(this.camera.camera.getPosition().x, Math.min(this.camera.camera.getPosition().y + 0.2 * dt, this.CamPosition), this.camera.camera.getPosition().z)
        }
    }

    _initialize() {
        this._initLight();
        this._initBox();
        this._initCamera();
        this.update()
        this._initProperty()
    }
    _initProperty() {
        this.boxUpdate = this.box

        this.change = true
        this.boxPositAfterClick = this.box.box.getPosition().y
        this.oldBox = this.box
        this.boxLoop = this.box
        this.gameEnd = false

        this.colorHex = '#5adeff'

        this.countUp = 0
        this.countPerfect = 0

        this.boxSpeed = 0.3
    }

    onMouseDown() {
        const box2 = new Box();
        box2.speed = this.boxSpeed
        this.boxSpeed += 0.005
        this.boxUpdate = box2;
        this.CamPosition = this.camera.camera.getPosition().y + box2.box.getLocalScale().y;
        this.boxPositAfterClick += box2.box.getLocalScale().y;

        box2.box.setPosition(
            box2.box.getPosition().x,
            this.boxPositAfterClick,
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
            this.boxPositAfterClick
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
                -0.3
            );
            box2.moveLeft = true;
            box2.moveRight = false;
        }
        if (this.change !== true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale());
            box2.box.setLocalPosition(
                -0.3,
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
            if (boxStay.perfect) {
                this.countPerfect++
                if (this.countPerfect >= 7) {
                    this.boxUp = boxStay
                    this.countUp = 10
                }

            }
            else {
                this.countPerfect = 0
            }
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
        this.colorHex = Color._darkerColor(this.colorHex);
    }

    scaleUp() {
        this.boxUp.box.setLocalScale(this.boxUp.box.getLocalScale().x + this.boxUp.box.getLocalScale().x * 0.005, this.boxUp.box.getLocalScale().y, this.boxUp.box.getLocalScale().z + this.boxUp.box.getLocalScale().z * 0.005)
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
            this.hexColor = Color._darkerColor(this.hexColor)
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