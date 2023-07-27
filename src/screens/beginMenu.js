import { Color, Entity } from "playcanvas";
import { Loader } from "../assetLoader/Loader";
import { Game } from "../game";

export class beginMenu extends Entity {
    constructor() {
        super()
        this._initGameName()
        this._initIntro()
        this._initButton()
        this._initScreen()
    }
    _initScreen() {
        this.screen = new pc.Entity();
        this.screen.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });

        this.screen.addChild(this.textDropShadow)
        this.screen.addChild(this.intro)
        this.screen.addChild(this.button)
        this.addChild(this.screen)

    }
    _initGameName() {
        this.textDropShadow = new pc.Entity();
        this.textDropShadow.setLocalPosition(0, -200, 0);
        this.textDropShadow.addComponent("element", {
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            fontAsset: Loader.getAssetByKey('CanvasFont'),
            fontSize: 200,
            text: "Stack",
            shadowColor: new pc.Color(1, 0, 0),
            shadowOffset: new pc.Vec2(0.25, -0.25),
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(255/255, 0/255, 64/255)
        });
        this.textDropShadow.setLocalPosition(0, 200, 0)

    }
    _initIntro() {
        this.intro = new pc.Entity();
        this.intro.setLocalPosition(0, -200, 0);
        this.intro.addComponent("element", {
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            fontAsset: Loader.getAssetByKey('CanvasFont'),
            fontSize: 100,
            text: "Tap to play",
            shadowColor: new pc.Color(1, 0, 0),
            shadowOffset: new pc.Vec2(0.25, -0.25),
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(1, 0, 0)
        });
        this.intro.setLocalPosition(0, -250, 0)
        this.introColor = 'red'    
        this.changeColorTime = 0.5;    

    }
    _initButton() {
        let texture = Loader.getAssetByKey("skin");
        this.button = new pc.Entity();
        this.button.addComponent("button", {
            active: true,
            imageEntity: this.button,
            hitPadding: [0, 0, 0, 0],
            transitionMode: pc.BUTTON_TRANSITION_MODE_TINT,
        });

        this.button.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            height: 20,
            pivot: [0.5, 0.5],
            color: [1, 1, 1],
            opacity: 1,
            rect: [0, 0, 1, 1],
            textureAsset: texture,
            fitMode: 'Strech',
            type: pc.ELEMENTTYPE_IMAGE,
            width: 92.5,
            useInput: true,
        });

        //Create a label for the button



        this.button.setLocalPosition(280, -650, 10)

    }
    update(dt) {
        if(this.changeColorTime < 0){
            if(this.introColor === 'red'){
                this.intro.element.color =  new pc.Color(5/255, 189/255, 250/255) 
                this.introColor = 'blue'
            }
            else{
                this.intro.element.color =  new pc.Color(1,0,0) 
                this.introColor = 'red'
    
            }
            this.changeColorTime = 0.5
        }
        else{
            this.changeColorTime -= dt
        }
       
    }

    destroy() {
        super.destroy()
    }
}