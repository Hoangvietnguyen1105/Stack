
import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";
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

    }

    onMouseDown() {
        console.log('abc')
        const box2 = new Box()
        this.boxUpdate = box2
        this.temp = this.camera.camera.getLocalPosition().y + box2.box.getLocalScale().y
        this.temp2 += box2.box.getLocalScale().y
        if (this.change === true) {
            box2.box.setLocalPosition(0, 0.5, -(box2.box.getLocalScale().z + box2.box.getLocalScale().z * 0.20))
            box2.moveLeft = true
            box2.moveRight = false
        }
        box2.box.setLocalPosition(box2.box.getLocalPosition().x, this.temp2, box2.box.getLocalPosition().z);
        box2.material.diffuse = new pc.Color().fromString(this.hexColor);
        var colorValue = parseInt(this.hexColor.substring(1), 16);
        colorValue -= this.colorStep;
        this.hexColor = '#' + colorValue.toString(16).padStart(6, '0');

        // const boxStay = LogicPlayScene.splitting(this.oldBox, this.oldoldbox)
        var boxStay = new Box()
        this.addChild(boxStay)
        console.log(this.oldoldbox.box.getLocalPosition().x)
        console.log(this.oldoldbox.box.getPosition().x)

        //split box
        if (this.change == true) {
            if (this.oldBox.box.getPosition().x > this.oldoldbox.box.getPosition().x && this.oldBox.box.getPosition().x < this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2) + (this.oldBox.box.getLocalPosition().x - this.oldBox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getLocalPosition().z)
                boxStay.box.setLocalScale((this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2) - (this.oldBox.box.getLocalPosition().x - this.oldBox.box.getLocalScale().x / 2), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)
            }
            else if (this.oldBox.box.getPosition().x < this.oldoldbox.box.getPosition().x && this.oldBox.box.getPosition().x > this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((this.oldBox.box.getLocalPosition().x + this.oldBox.box.getLocalScale().x / 2) + (this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getLocalPosition().z)
                boxStay.box.setLocalScale((this.oldBox.box.getLocalPosition().x + this.oldBox.box.getLocalScale().x / 2) - (this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)
            }
            else {
                Game.replay()
                return
            }
        }
        else {
            if (this.oldBox.box.getPosition().z > this.oldoldbox.box.getPosition().z && this.oldBox.box.getPosition().z < this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(this.oldoldbox.box.getLocalPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2) + (this.oldBox.box.getLocalPosition().z - this.oldBox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, (this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2) - (this.oldBox.box.getLocalPosition().z - this.oldBox.box.getLocalScale().z / 2))
            }
            else if (this.oldBox.box.getPosition().z < this.oldoldbox.box.getPosition().z && this.oldBox.box.getPosition().z > this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(this.oldoldbox.box.getLocalPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldBox.box.getLocalPosition().z + this.oldBox.box.getLocalScale().z / 2) + (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, (this.oldBox.box.getLocalPosition().z + this.oldBox.box.getLocalScale().z / 2) - (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2))
            }
            else {
                Game.replay()
                return
            }
        }
        if (this.change === true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale())
            box2.box.setLocalPosition(boxStay.box.getLocalPosition().x, boxStay.box.getLocalPosition().y + boxStay.box.getLocalScale().y, -(boxStay.box.getLocalPosition().z + boxStay.box.getLocalPosition().z + (boxStay.box.getLocalScale().z * 0.2)))

        }
        if (this.change !== true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale())
            box2.box.setLocalPosition(-(boxStay.box.getLocalPosition().x + boxStay.box.getLocalPosition().x + (boxStay.box.getLocalScale().x * 0.2)), boxStay.box.getLocalPosition().y + boxStay.box.getLocalScale().y, boxStay.box.getLocalPosition().z)
        }

        boxStay.moveLeft = false
        boxStay.moveDown = false
        boxStay.moveRight = false
        boxStay.moveUp = false
        boxStay.shouldChangeDirection = false;
        boxStay.material.diffuse = new pc.Color().fromString(this.hexColor);

        this.removeChild(this.oldBox)
        this.addChild(box2);
        this.boxLoop = box2
        this.oldoldbox = boxStay
        this.oldBox = box2

        this.change = !this.change
    }

    _initBox() {

        this.box = new Box();
        this.boxUpdate = this.box
        this.change = true;
        this.addChild(this.box);

        this.lct = 0 - this.box.box.getLocalScale().y;
        this.hexColor = '#e6e8f5';
        this.colorStep = -300;

        for (var i = 0; i < 30; i++) {
            var box3 = new Box();
            this.addChild(box3);
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
            this.oldoldbox = box3
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