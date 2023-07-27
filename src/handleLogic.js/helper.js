import { Box } from "../object/box";
import { Config } from "../gameConfig";
import { Color } from "playcanvas";
import { calculateColor } from "../logic/Color2";
import { physics } from "../object/physics";
export class helper{
    static _initBox(obj) {

        obj.color = new pc.Color(obj.listColor[0][0]/255,obj.listColor[0][1]/255,obj.listColor[0][2]/255);
    
    
       obj.box = new Box();
       obj.boxUpdate = obj.box
       obj.change = true;
       obj.box.material.diffuse = obj.color
       obj.box.setPosition(obj.box.getPosition().x + obj.box.getLocalScale().x * 0.30, obj.box.getPosition().y, 0)
       obj.addChild(obj.box);
    
       obj.lct = 0 - obj.box.box.getLocalScale().y;
       obj.hexColor = Config.color1['firstColor'];
       obj.colorStep = -30;
    
       for (var i = 0; i < 30; i++) {
           var box3 = new Box();
           obj.addChild(box3);
    
           const color = new pc.Color(obj.listColor[obj.index][0]/255,obj.listColor[obj.index][1]/255,obj.listColor[obj.index][2]/255);
           
    
           box3.material.diffuse =color
           box3.moveDown = false;
           box3.moveLeft = false;
           box3.moveUp = false;
           box3.moveRight = false;
    
           box3.setLocalPosition(box3.box.getLocalScale().x + box3.box.getLocalScale().x * 0.20, obj.lct, 0);
           obj.lct -= box3.box.getLocalScale().y;
    
           // Giảm giá trị màu theo colorStep
    
           obj.oldoldbox = box3
           physics.physics(box3, 'static')
           obj.index++
           if(obj.index > 6){
               obj.step ++
               obj.firstColor = Config.color1[`colorStep${obj.step + 1}`]
               if(obj.step === 3){
                   obj.lastColor = Config.color1[`colorStep1`]
                   obj.step = 0
               }
               obj.lastColor = Config.color1[`colorStep${obj.step + 2}`]
               obj.listColor = calculateColor.smoothChangingcolor( obj.firstColor,obj.lastColor)
               obj.index = 0 
           }
       }
       obj.step = 0
       obj.index = 0 
       obj.listColor = calculateColor.smoothChangingcolor(Config.color1[`colorStep${obj.step + 1}`],Config.color1[`colorStep${obj.step + 2}`])
    
    }
}

