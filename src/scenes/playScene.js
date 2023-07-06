
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
        const box2 = new Box()
        this.boxUpdate = box2
        this.temp = this.camera.camera.getPosition().y + box2.box.getLocalScale().y
        this.temp2 += box2.box.getLocalScale().y
        if (this.change === true) {
            box2.box.setLocalPosition(0, 0.5, -(box2.box.getLocalScale().z + box2.box.getLocalScale().z * 0.20))
            box2.moveLeft = true
            box2.moveRight = false
        }
        box2.box.setLocalPosition(box2.box.getPosition().x, this.temp2, box2.box.getPosition().z);
        const color = new pc.Color().fromString(this.hexColor);
        box2.material.diffuse = color
        var colorValue = parseInt(this.hexColor.substring(1), 16);
        colorValue -= this.colorStep;
        this.hexColor = '#' + colorValue.toString(16).padStart(6, '0');

        var boxStay = new Box()
        var boxFall = new Box()
        //split box
        this.splitPlane(boxStay, boxFall)




        if (this.gameEnd) {
            Game.replay()
            return
        }


        if (this.change === true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale())
            box2.box.setLocalPosition(boxStay.box.getPosition().x, boxStay.box.getPosition().y + boxStay.box.getLocalScale().y, -(boxStay.box.getPosition().z + boxStay.box.getPosition().z + (boxStay.box.getLocalScale().z * 0.2)))

        }
        if (this.change !== true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale())
            box2.box.setLocalPosition(-(boxStay.box.getPosition().x + boxStay.box.getPosition().x + (boxStay.box.getLocalScale().x * 0.2)), boxStay.box.getPosition().y + boxStay.box.getLocalScale().y, boxStay.box.getPosition().z)
        }

        boxStay.moveLeft = false
        boxStay.moveDown = false
        boxStay.moveRight = false
        boxStay.moveUp = false
        boxStay.shouldChangeDirection = false;
        boxStay.material.diffuse = color
        boxFall.material.diffuse = color

        this.removeChild(this.oldBox)

        this.addChild(box2);
        this.addChild(boxStay)
        this.addChild(boxFall)



        setTimeout(() => {
            this.physics(boxFall, 'dynamic');
        }, 120);
        this.physics(boxStay, 'static')


        this.boxTest = boxFall



        this.boxLoop = box2
        this.oldoldbox = boxStay
        this.oldBox = box2

        this.change = !this.change
    }




    splitPlane(boxStay, boxFall) {
        if (this.change === true) {
            if (this.oldBox.box.getPosition().x > this.oldoldbox.box.getPosition().x && this.oldBox.box.getPosition().x < this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2) + (this.oldBox.box.getPosition().x - this.oldBox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getPosition().z)
                boxStay.box.setLocalScale((this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2) - (this.oldBox.box.getPosition().x - this.oldBox.box.getLocalScale().x / 2), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)
                boxFall.box.setLocalPosition(((this.oldBox.box.getPosition().x + this.oldBox.box.getLocalScale().x / 2) + (this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getPosition().z)
                boxFall.box.setLocalScale(((this.oldBox.box.getPosition().x + this.oldBox.box.getLocalScale().x / 2) - (this.oldoldbox.box.getPosition().x + this.oldoldbox.box.getLocalScale().x / 2)), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)

            }
            else if (this.oldBox.box.getPosition().x < this.oldoldbox.box.getPosition().x && this.oldBox.box.getPosition().x > this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((this.oldBox.box.getPosition().x + this.oldBox.box.getLocalScale().x / 2) + (this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getPosition().z)
                boxStay.box.setLocalScale(((this.oldBox.box.getPosition().x + this.oldBox.box.getLocalScale().x / 2) - (this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2)), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)
                boxFall.box.setLocalPosition(((this.oldBox.box.getPosition().x - this.oldBox.box.getLocalScale().x / 2) + (this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2)) / 2, this.temp2 - this.oldBox.box.getLocalScale().y, this.oldoldbox.box.getPosition().z)
                boxFall.box.setLocalScale(((this.oldoldbox.box.getPosition().x - this.oldoldbox.box.getLocalScale().x / 2) - (this.oldBox.box.getPosition().x - this.oldBox.box.getLocalScale().x / 2)), this.oldoldbox.box.getLocalScale().y, this.oldoldbox.box.getLocalScale().z)


            }
            else {
                this.gameEnd = true

            }
        }
        else {
            if (this.oldBox.box.getPosition().z > this.oldoldbox.box.getPosition().z && this.oldBox.box.getPosition().z < this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(this.oldoldbox.box.getPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2) + (this.oldBox.box.getPosition().z - this.oldBox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, (this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2) - (this.oldBox.box.getPosition().z - this.oldBox.box.getLocalScale().z / 2))
                boxFall.box.setLocalPosition(this.oldoldbox.box.getPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldBox.box.getPosition().z + this.oldBox.box.getLocalScale().z / 2) + (this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2)) / 2)
                boxFall.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, ((this.oldBox.box.getPosition().z + this.oldBox.box.getLocalScale().z / 2) - (this.oldoldbox.box.getPosition().z + this.oldoldbox.box.getLocalScale().z / 2)))

            }
            else if (this.oldBox.box.getPosition().z < this.oldoldbox.box.getPosition().z && this.oldBox.box.getPosition().z > this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(this.oldoldbox.box.getPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldBox.box.getPosition().z + this.oldBox.box.getLocalScale().z / 2) + (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, (this.oldBox.box.getPosition().z + this.oldBox.box.getLocalScale().z / 2) - (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2))
                boxFall.box.setLocalPosition(this.oldoldbox.box.getPosition().x, this.temp2 - this.oldBox.box.getLocalScale().y, ((this.oldBox.box.getPosition().z - this.oldBox.box.getLocalScale().z / 2) + (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2)) / 2)
                boxFall.box.setLocalScale(this.oldoldbox.box.getLocalScale().x, this.oldoldbox.box.getLocalScale().y, (this.oldoldbox.box.getPosition().z - this.oldoldbox.box.getLocalScale().z / 2) - (this.oldBox.box.getPosition().z - this.oldBox.box.getLocalScale().z / 2))

            }
            else {
                this.gameEnd = true

            }
        }
    }

    physics(box, type) {
        console.log(box.box.getLocalScale())

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
            box3.box.addComponent("rigidbody", {
                type: "static",
                mass: 50,
                restitution: 0.5,
            });

            box3.box.addComponent("collision", {
                type: "box",
                halfExtents: new pc.Vec3(box3.box.getLocalScale().x / 2, box3.box.getLocalScale().y / 2, box3.box.getLocalScale().z / 2), // Kích thước của vùng va chạm thu nhỏ
            });
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