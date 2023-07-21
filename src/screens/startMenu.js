import { Entity } from "playcanvas";
import { Loader } from "../assetLoader/Loader";
import { Game } from "../game";
export class startMenu extends Entity {
    constructor() {
        super()
        this._initButton()
        this._initPoint()
        this._initScreen()
        this.gameReplaybutton = false
        this.point = 0
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
        this.addChild(this.screen)
    }
    _initButton() {
        let texture = Loader.getAssetByKey("replay");
        this.button = new pc.Entity();
        this.button.addComponent("button", {
            active: true,
            imageEntity: this.button,
            hitPadding: [0, 0, 0, 0],
            transitionMode: pc.BUTTON_TRANSITION_MODE_TINT,
        });

        this.button.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            height: 40,
            pivot: [0.5, 0.5],
            color: [1, 1, 1],
            opacity: 1,
            rect: [0, 0, 1, 1],
            textureAsset: texture,
            fitMode: 'Strech',
            type: pc.ELEMENTTYPE_IMAGE,
            width: 175,
            useInput: true,
        });

        //Create a label for the button
        const label = new pc.Entity();
        label.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            color: new pc.Color(1, 1, 1),
            fontAsset: Loader.getAssetByKey('font'),
            fontSize: 32,
            height: 64,
            pivot: [0.5, 0.5],
            textureAsset: texture,
            text: 'replay',
            type: "text",
            width: 128,
            wrapLines: true,
        });

        this.button.addChild(label);
        this.button.button.on("click", function () {
            Game.load()
        });
        this.button.setLocalPosition(0, -150, 0)

    }
    _initPoint() {
        this.textDropShadow = new pc.Entity();
        this.textDropShadow.addComponent("element", {
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            fontAsset: Loader.getAssetByKey('font'),
            fontSize: 200,
            text: this.point,
            shadowColor: new pc.Color(1, 0, 0),
            shadowOffset: new pc.Vec2(0.25, -0.25),
            type: pc.ELEMENTTYPE_TEXT,
        });
        this.textDropShadow.setLocalPosition(0, 250, 0)

    }
    update(dt) {
        this.textDropShadow.element.text = this.point
        if (this.gameReplaybutton)
            this.screen.addChild(this.button)
    }
    destroy() {
        super.destroy()
    }
}