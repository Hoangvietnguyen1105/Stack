import { startMenu } from "../screens/startMenu";
import { Box } from "../object/box";
import { calculateColor } from "../logic/Color2";
import { Config } from "../gameConfig";
import { LogicPlayScene } from "../logic/splitBox";
import { physics } from "../object/physics";
import { Color } from "../logic/randomColor";
export class handleMouseDown{
    static mouseDown(obj){
        obj.effectMap.setPosition(-1,obj.effectMap.getPosition().y + obj.oldBox.box.getLocalScale().y,-1)
         console.log(obj.effectMap.getPosition())
        //nâng ánh sáng mỗi  khi click
        obj.light.light.setPosition(obj.light.light.getPosition().x,obj.light.light.getPosition().y + obj.oldBox.box.getLocalScale().y,obj.light.light.getPosition().z)

        obj.sound.stop('gameSound');

        
        if (obj.initPoint) {
            obj.removeChild(obj.beginMenu)
            obj.beginMenu.destroy()
            obj.menu = new startMenu()
            obj.addChild(obj.menu)
            obj.initPoint = false
        }
        if (obj.gameEnd) {
            return;
        }

        const box2 = new Box();
        box2.speed = obj.boxSpeed
        // increase speed 
        obj.boxSpeed += Config.box['speedup']
        obj.boxUpdate = box2;
        obj.CamPosition = obj.camera.camera.getPosition().y + box2.box.getLocalScale().y;
        obj.boxPositAfterClick += box2.box.getLocalScale().y;
        // let planeColor = calculateColor.calculateContrastingColor([252, 144, 3],[3, 28, 252])
        // const color = new pc.Color(planeColor[0]/255,planeColor[1]/255,planeColor[2]/255);
        console.log( obj.step ,
            obj.index )
        const color = new pc.Color(obj.listColor[obj.index][0]/255,obj.listColor[obj.index][1]/255,obj.listColor[obj.index][2]/255);
        box2.material.diffuse = color;

        var boxStay = new Box();
        var boxFall = new Box();
        // Split box
        if(obj.countPerfect >= 2){
            obj.gameEnd = LogicPlayScene.splitPlane(
                boxStay,
                boxFall,
                obj.change,
                obj.oldBox,
                obj.oldoldbox,
                obj.boxPositAfterClick,
                0.05
            );
        }
        else{
            obj.gameEnd = LogicPlayScene.splitPlane(
                boxStay,
                boxFall,
                obj.change,
                obj.oldBox,
                obj.oldoldbox,
                obj.boxPositAfterClick,
                0.1
            );
        }
        

        if (obj.gameEnd) {
            boxFall = obj.oldBox;
            setTimeout(() => {
                obj.menu.gameReplaybutton = true
                return;
            }, 1500);
            obj.sound.play('gameOver');
            setTimeout(function (count) { 
                obj.sound.pause('gameOver');
            }.bind(obj, obj.countPerfect), 920);

        }

        if (!obj.gameEnd) {
            obj.point++
            obj.menu.point = obj.point
        }



        if (obj.change === true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale());
            box2.box.setLocalPosition(
                boxStay.box.getPosition().x,
                boxStay.box.getPosition().y + boxStay.box.getLocalScale().y,
                -0.3
            );
            box2.moveLeft = true;
            box2.moveRight = false;
        }
        if (obj.change !== true) {
            box2.box.setLocalScale(boxStay.box.getLocalScale());
            box2.box.setLocalPosition(
                -0.3,
                boxStay.box.getPosition().y + boxStay.box.getLocalScale().y,
                boxStay.box.getPosition().z
            );
        }

        boxStay.material.diffuse = obj.oldBox.material.diffuse;
        boxFall.material.diffuse = obj.oldBox.material.diffuse;

        //perfect time
        if (!obj.gameEnd) {
            obj.addChild(box2);
            //add boxStay to child and array
            obj.addChild(boxStay);
           


            if (boxStay.perfect && obj.countPerfect >= 0) {
                if (obj.countPerfect < 7)
                    obj.countPerfect++

                obj.sound.play(`perfect${obj.countPerfect}`);
                setTimeout(function (count) {
                    obj.sound.pause(`perfect${count}`);
                }.bind(obj, obj.countPerfect), 650);
                obj._initPlane(
                    boxStay.box.getPosition().x, boxStay.box.getPosition().y, boxStay.box.getPosition().z,
                    boxStay.box.getLocalScale().x, boxStay.box.getLocalScale().y, boxStay.box.getLocalScale().z
                )
                if (obj.countPerfect >= 4) {
                    obj._initPlane2(
                        boxStay.box.getPosition().x, boxStay.box.getPosition().y, boxStay.box.getPosition().z,
                        Config.box['scaleX'] * 2, 0.1, Config.box['scaleZ'] * 2
                    )
                }
                if (obj.countPerfect >= 7) {
                    obj.testEffect.play();
                    setTimeout(function () {
                        obj.testEffect.stop();
                    }.bind(obj), 2000);
                    obj.boxUp = boxStay
                    obj.countUp = 10
                }

            }
            else {
                obj.countPerfect = 0
                obj.sound.play('notPerfect');
                setTimeout(function (count) {
                    obj.sound.pause('notPerfect');
                }.bind(obj, obj.countPerfect), 350);
            }   
        }

        obj.removeChild(obj.oldBox);
        
        obj.addChild(boxFall);
        obj.boxFalls.push(boxFall)

        // Add physics
        setTimeout(() => {
            physics.physics(boxFall, 'dynamic');
        }, 120);
        physics.physics(boxStay, 'static');
        // setTimeout(() => {
        //     obj.removeChild(boxFall)
        //     boxFall.destroy()
        // }, 1000);
        obj.boxLoop = box2;
        obj.oldoldbox = boxStay;
        obj.oldBox = box2;

        obj.change = !obj.change;

        // Đậm dần màu của box2
        obj.colorHex = Color._darkerColor(obj.colorHex);
        obj.index++
        if(obj.index > 6){
            obj.step ++
            obj.firstColor = Config.color1[`colorStep${obj.step + 1}`]
            if(obj.step === 4){
                obj.lastColor = Config.color1[`colorStep1`]
                obj.step = 0
            }
            obj.lastColor = Config.color1[`colorStep${obj.step + 2}`]
            obj.listColor = calculateColor.smoothChangingcolor( obj.firstColor,obj.lastColor)
            obj.index = 0 
        }
    }   
}