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
import { helper } from "../handleLogic.js/helper.js";
import { handleMouseDown } from "../handleLogic.js/handleMouseDown.js";
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
        helper._initBox(this)
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
       handleMouseDown.mouseDown(this)
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