import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";
import { Loader } from "../assetLoader/Loader.js";

export class StartScene extends Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {
        if (this.box) {
            this.box.update(dt)
        }
    }

    _initialize() {
        this._initLight();
        this._initCamera();
        this._initBox();
        this._initButton()
        this._initScreen()
    }

    onMouseDown() {

        Game.load()
    }

    _initBox() {

    }

    _initCamera() {
        const camera = new pc.Entity();
        camera.addComponent("camera", {
            clearColor: new pc.Color(30 / 255, 30 / 255, 30 / 255),
        });
        this.addChild(camera);

    }

    _initLight() {
        this.light = new Light();
        this.light.light.setLocalEulerAngles(85.63, -58.9, -126.06);
        this.light.light.setLocalPosition(0.5530560612678528, 1.0613877773284912, 0.5824261903762817);
        this.addChild(this.light.light);
    }


    _initScreen() {
        const screen = new pc.Entity();
        screen.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });
        screen.addChild(this.button)
        this.addChild(screen)
    }
    _initButton() {
        this.button = new pc.Entity();
        this.button.addComponent("button", {
            imageEntity: this.button,
        });

        this.button.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            height: 40,
            pivot: [0.5, 0.5],
            type: pc.ELEMENTTYPE_IMAGE,
            width: 175,
            useInput: true,
        });


        // Create a label for the button
        const label = new pc.Entity();
        label.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            color: new pc.Color(0, 0, 0),
            fontAsset: Loader.getAssetByKey('font'),
            fontSize: 32,
            height: 64,
            pivot: [0.5, 0.5],
            text: "Play again",
            type: pc.ELEMENTTYPE_TEXT,
            width: 128,
            wrapLines: true,
        });

        this.button.addChild(label);
        this.button.button.on("click", function () {
            Game.load()
        });

    }


}
