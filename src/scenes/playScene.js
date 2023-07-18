import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";
import { LogicPlayScene } from "../logic/splitBox.js";
import { Loader } from "../assetLoader/Loader.js";
import { Color } from "../logic/randomColor.js";
import { Config } from "../gameConfig.js";
import { Plane } from "../object/plane.js";
import { Plane2 } from "../object/plane2.js";
import { TestEffect } from "../object/effect/testEffect.js";
import { Audio } from "../object/audio.js";
import { physics } from "../object/physics.js";
import { startMenu } from "../screens/startMenu.js";
import { beginMenu } from "../screens/beginMenu.js";
export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {
        if (!this.initPoint) {
            if (this.menu) {
                this.menu.update(dt)
            }
            if (this.countUp > 0) {
                this.scaleUp()
                this.countUp--;
            }
            if (this.boxUpdate) {
                this.boxUpdate.update(dt)
            }
            if (this.camera.camera.getPosition().y < this.CamPosition) {
                this.camera.camera.setPosition(this.camera.camera.getPosition().x, Math.min(this.camera.camera.getPosition().y + 0.12 * dt, this.CamPosition), this.camera.camera.getPosition().z)
            }
        }

    }

    _initialize() {

        this._initAudio()
        this._initLight();
        this._initBox();
        this._initCamera();
        this.update();
        this._initProperty();
        this._initTestEffect();
        this.beginMenu = new beginMenu()
        this.addChild(this.beginMenu)

    }
    _initProperty() {
        this.boxUpdate = this.box
        this.change = true
        this.boxPositAfterClick = this.box.box.getPosition().y
        this.oldBox = this.box
        this.boxLoop = this.box
        // define when game end or not
        this.gameEnd = false
        // default colorHex
        this.colorHex = Config.color1['firstColor']
        // count when perfect an up scale for box
        this.countUp = 0
        this.countPerfect = -1
        //default speed of box
        this.boxSpeed = Config.box['speed']
        //point
        this.point = -1
        this.initPoint = true
    }

    onMouseDown() {
        if (this.initPoint) {
            this.removeChild(this.beginMenu)
            this.beginMenu.destroy()
            this.menu = new startMenu()
            this.addChild(this.menu)
            this.initPoint = false
        }
        if (this.gameEnd) {
            return;
        }

        const box2 = new Box();
        box2.speed = this.boxSpeed
        // increase speed 
        this.boxSpeed += Config.box['speedup']
        this.boxUpdate = box2;
        this.CamPosition = this.camera.camera.getPosition().y + box2.box.getLocalScale().y;
        this.boxPositAfterClick += box2.box.getLocalScale().y;
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
                this.menu.gameReplaybutton = true
                return;
            }, 1500);
        }

        if (!this.gameEnd) {
            this.point++
            this.menu.point = this.point
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

        boxStay.material.diffuse = this.oldBox.material.diffuse;
        boxFall.material.diffuse = this.oldBox.material.diffuse;

        //perfect time
        if (!this.gameEnd) {
            this.addChild(box2);
            this.addChild(boxStay);
            if (boxStay.perfect && this.countPerfect >= 0) {
                if (this.countPerfect < 7)
                    this.countPerfect++

                this.sound.play(`perfect${this.countPerfect}`);
                setTimeout(function (count) {
                    this.sound.pause(`perfect${count}`);
                }.bind(this, this.countPerfect), 650);
                this._initPlane(
                    boxStay.box.getPosition().x, boxStay.box.getPosition().y, boxStay.box.getPosition().z,
                    boxStay.box.getLocalScale().x, boxStay.box.getLocalScale().y, boxStay.box.getLocalScale().z
                )
                if (this.countPerfect >= 4) {
                    this._initPlane2(
                        boxStay.box.getPosition().x, boxStay.box.getPosition().y, boxStay.box.getPosition().z,
                        Config.box['scaleX'] * 2, 0.1, Config.box['scaleZ'] * 2
                    )
                }
                if (this.countPerfect >= 7) {
                    this.testEffect.play();
                    setTimeout(function () {
                        this.testEffect.stop();
                    }.bind(this), 2000);
                    this.boxUp = boxStay
                    this.countUp = 10
                }

            }
            else {
                this.countPerfect = 0
            }
        }

        this.removeChild(this.oldBox);
        this.addChild(boxFall);

        // Add physics
        setTimeout(() => {
            physics.physics(boxFall, 'dynamic');
        }, 120);
        physics.physics(boxStay, 'static');

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



    _initPlane(x, y, z, x1, y1, z1) {
        this.plane = new Plane()
        this.addChild(this.plane)
        this.plane.plane.setLocalPosition(x, y, z)

        this.plane.plane.setLocalScale(x1 + 0.03, y1 * 1.3, z1 + 0.03)
    }
    _initPlane2(x, y, z, x1, y1, z1) {
        const plane = new Plane2()
        this.addChild(plane)
        plane.plane.setLocalPosition(x, y, z)
        plane.plane.setLocalScale(x1, y1, z1)
    }

    _initTestEffect() {
        this.testEffect = new TestEffect();
        this.addChild(this.testEffect);
    }



    _initBox() {
        this.box = new Box();
        this.boxUpdate = this.box
        this.change = true;
        console.log(this.box.getPosition())
        this.box.setPosition(this.box.getPosition().x + this.box.getLocalScale().x * 0.30, this.box.getPosition().y, 0)
        this.addChild(this.box);

        this.lct = 0 - this.box.box.getLocalScale().y;
        this.hexColor = Config.color1['firstColor'];
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
            physics.physics(box3, 'static')
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
    _initAudio() {
        Audio._initAudio(this)
    }


}