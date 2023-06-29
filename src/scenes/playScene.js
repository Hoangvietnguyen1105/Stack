
import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { box } from "../object/box.js";
import { LogicPlayScene } from "../logic/logicPlay.js";
export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {
        if (this.camera.camera.getPosition().y < this.temp) {
            this.camera.camera.setPosition(this.camera.camera.getPosition().x, Math.min(this.camera.camera.getPosition().y + 0.2 * dt, this.temp), this.camera.camera.getPosition().z)
        }
    }

    _initialize() {
        this._initLight();
        this._initBox();
        this._initCamera();
        this.update()
        this.change = true
        this.temp2 = this.box.box.getPosition().y
        this.oldBox = this.box
    }

    onMouseDown() {
        this.oldBox.moveLeft = false
        this.oldBox.moveDown = false
        this.oldBox.moveRight = false
        this.oldBox.moveUp = false
        this.oldBox.shouldChangeDirection = false;
        //LogicPlayScene.splitting()
        const box2 = new box()
        this.temp = this.camera.camera.getLocalPosition().y + box2.box.getLocalScale().y
        this.temp2 += box2.box.getLocalScale().y
        if (this.change === true) {
            box2.box.setLocalPosition(0, 0.5, -(box2.box.getLocalScale().x + box2.box.getLocalScale().x * 0.20))
            box2.moveLeft = true
            box2.moveRight = false
        }
        box2.box.setPosition(box2.box.getPosition().x, this.temp2, box2.box.getPosition().z);
        box2.material.diffuse = new pc.Color().fromString(this.hexColor);
        var colorValue = parseInt(this.hexColor.substring(1), 16);
        colorValue -= this.colorStep;
        this.hexColor = '#' + colorValue.toString(16).padStart(6, '0');
        const boxStay = new box()
        boxStay.box.setPosition()
        this.addChild(box2);
        this.oldBox = box2
        this.change = !this.change
    }

    _initBox() {
        this.box = new box();
        this.change = true;
        this.addChild(this.box);

        this.lct = 0 - this.box.box.getLocalScale().y;
        this.hexColor = '#e6e8f5';
        this.colorStep = -300;

        for (var i = 0; i < 30; i++) {
            var box3 = new box();
            box3.material.diffuse = new pc.Color().fromString(this.hexColor);

            box3.moveDown = false;
            box3.moveLeft = false;
            box3.moveUp = false;
            box3.moveRight = false;

            box3.setLocalPosition(box3.box.getLocalScale().x + box3.box.getLocalScale().x * 0.20, this.lct, 0);
            this.lct -= box3.box.getLocalScale().y;

            // Giảm giá trị màu theo colorStep
            var colorValue = parseInt(this.hexColor.substring(1), 16);
            colorValue -= this.colorStep;
            this.hexColor = '#' + colorValue.toString(16).padStart(6, '0');

            this.addChild(box3);
        }
    }
    _initCamera() {
        this.camera = new Camera()
        this.addChild(this.camera.camera);
    }
    _initLight() {
        this.light = new Light()
        this.light.light.setLocalEulerAngles(85.63, -58.9, -126.06)
        this.light.light.setLocalPosition(0.5530560612678528, 1.0613877773284912, 0.5824261903762817);
        this.addChild(this.light.light);
    }






}