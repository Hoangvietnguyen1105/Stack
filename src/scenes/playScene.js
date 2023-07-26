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
import { Background } from "../object/background.js";
import { planeBackground } from "../object/planeBackground.js";
import { calculateColor } from "../logic/Color2.js";
import { Texture } from "playcanvas";
import { effectMap } from "../object/effect/effectMap.js";
import { _initBox } from "../helper.js";
export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {

        if(this.Background && dt){
            this.Background.update(dt)
        }
        if(this.camera && this.boxFalls){
            for(var i = 0 ; i < this.boxFalls.length;i++){
                if(this.boxFalls[i].box.getPosition().y < (this.camera.camera.getPosition().y-1.5)){
                    this.boxFalls[i].destroy()
                    this.boxFalls.splice(i, 1);
                }
            }
        }
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
            if (this.camera.camera.getPosition().y < this.CamPosition - 0.00001) {    
                this.camera.camera.setPosition(this.camera.camera.getPosition().x, Math.min(this.camera.camera.getPosition().y + 0.12 * dt, this.CamPosition), this.camera.camera.getPosition().z)
                this.Background.Background.setPosition( this.Background.Background.getPosition().x,Math.min(this.Background.Background.getPosition().y + 0.12 * dt,this.oldoldbox.box.getLocalScale().y + this.Background.Background.getPosition().y),this.Background.Background.getPosition().z )
            }
        }

    }

    _initialize() {
        this._initColor()

        this.Background = new planeBackground()
        this.addChild(this.Background)
        this._initAudio()
        this._initLight();
        this._initBox();
        this._initCamera();
        this.update();
        this._initProperty();
        this._initTestEffect();
        this.beginMenu = new beginMenu()
        this.addChild(this.beginMenu)
        this.sound.play('gameSound');
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
        //list of boxStay
        this.boxFalls = []
        
    }

    onMouseDown() {
        
        //nâng ánh sáng mỗi  khi click
        this.light.light.setPosition(this.light.light.getPosition().x,this.light.light.getPosition().y + this.oldBox.box.getLocalScale().y,this.light.light.getPosition().z)

        this.sound.stop('gameSound');

        
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
        // let planeColor = calculateColor.calculateContrastingColor([252, 144, 3],[3, 28, 252])
        // const color = new pc.Color(planeColor[0]/255,planeColor[1]/255,planeColor[2]/255);
        console.log( this.step ,
            this.index )
        const color = new pc.Color(this.listColor[this.index][0]/255,this.listColor[this.index][1]/255,this.listColor[this.index][2]/255);
        box2.material.diffuse = color;

        var boxStay = new Box();
        var boxFall = new Box();
        // Split box
        if(this.countPerfect >= 2){
            this.gameEnd = LogicPlayScene.splitPlane(
                boxStay,
                boxFall,
                this.change,
                this.oldBox,
                this.oldoldbox,
                this.boxPositAfterClick,
                0.05
            );
        }
        else{
            this.gameEnd = LogicPlayScene.splitPlane(
                boxStay,
                boxFall,
                this.change,
                this.oldBox,
                this.oldoldbox,
                this.boxPositAfterClick,
                0.1
            );
        }
        

        if (this.gameEnd) {
            boxFall = this.oldBox;
            setTimeout(() => {
                this.menu.gameReplaybutton = true
                return;
            }, 1500);
            this.sound.play('gameOver');
            setTimeout(function (count) { 
                this.sound.pause('gameOver');
            }.bind(this, this.countPerfect), 920);

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
            //add boxStay to child and array
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
                this.sound.play('notPerfect');
                setTimeout(function (count) {
                    this.sound.pause('notPerfect');
                }.bind(this, this.countPerfect), 350);
            }   
        }

        this.removeChild(this.oldBox);
        
        this.addChild(boxFall);
        this.boxFalls.push(boxFall)

        // Add physics
        setTimeout(() => {
            physics.physics(boxFall, 'dynamic');
        }, 120);
        physics.physics(boxStay, 'static');
        // setTimeout(() => {
        //     this.removeChild(boxFall)
        //     boxFall.destroy()
        // }, 1000);
        this.boxLoop = box2;
        this.oldoldbox = boxStay;
        this.oldBox = box2;

        this.change = !this.change;

        // Đậm dần màu của box2
        this.colorHex = Color._darkerColor(this.colorHex);
        this.index++
        if(this.index > 9){
            this.step ++
            this.firstColor = Config.color1[`colorStep${this.step + 1}`]
            if(this.step === 4){
                this.lastColor = Config.color1[`colorStep1`]
                this.step = 0
            }
            this.lastColor = Config.color1[`colorStep${this.step + 2}`]
            this.listColor = calculateColor.smoothChangingcolor( this.firstColor,this.lastColor)
            this.index = 0 
        }
    }

    scaleUp() {
        this.boxUp.box.setLocalScale(Math.min(this.boxUp.box.getLocalScale().x + this.boxUp.box.getLocalScale().x * 0.005,0.30), this.boxUp.box.getLocalScale().y, Math.min(this.boxUp.box.getLocalScale().z + this.boxUp.box.getLocalScale().x * 0.005,0.30))
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
        this.effectMap = new effectMap()
        this.addChild(this.effectMap)
        this.effectMap.play()
    }




    _initBox() {

         this.color = new pc.Color(this.listColor[0][0]/255,this.listColor[0][1]/255,this.listColor[0][2]/255);


        this.box = new Box();
        this.boxUpdate = this.box
        this.change = true;
        this.box.material.diffuse = this.color
        this.box.setPosition(this.box.getPosition().x + this.box.getLocalScale().x * 0.30, this.box.getPosition().y, 0)
        this.addChild(this.box);

        this.lct = 0 - this.box.box.getLocalScale().y;
        this.hexColor = Config.color1['firstColor'];
        this.colorStep = -30;

        for (var i = 0; i < 30; i++) {
            var box3 = new Box();
            this.addChild(box3);

            const color = new pc.Color(this.listColor[this.index][0]/255,this.listColor[this.index][1]/255,this.listColor[this.index][2]/255);
            

            box3.material.diffuse =color
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
            this.index++
            if(this.index > 9){
                this.step ++
                this.firstColor = Config.color1[`colorStep${this.step + 1}`]
                if(this.step === 3){
                    this.lastColor = Config.color1[`colorStep1`]
                    this.step = 0
                }
                this.lastColor = Config.color1[`colorStep${this.step + 2}`]
                this.listColor = calculateColor.smoothChangingcolor( this.firstColor,this.lastColor)
                this.index = 0 
            }
        }
        this.step = 0
        this.index = 0 
        this.listColor = calculateColor.smoothChangingcolor(Config.color1[`colorStep${this.step + 1}`],Config.color1[`colorStep${this.step + 2}`])

    }
    _initCamera() {
        this.camera = new Camera()
        this.addChild(this.camera.camera);

    }
    _initLight() {
        this.light = new Light()
        this.light.light.setLocalEulerAngles(160.84,15.16, 126.2)
        this.light.light.setLocalPosition(1.467, 2, 0.972);
        this.addChild(this.light.light);
    }
    _initAudio() {
        Audio._initAudio(this)
    }
    _initColor(){
        //list of color
        this.step = 0
        this.index = 0 

        this.listColor = calculateColor.smoothChangingcolor(Config.color1[`colorStep${this.step + 1}`],Config.color1[`colorStep${this.step + 2}`])
    }


}