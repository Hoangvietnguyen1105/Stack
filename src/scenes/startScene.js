
import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
export class StartScene extends Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        super.create();
        this._initialize();
    }

    update(dt) {
    }

    _initialize() {
        this._initLight();

        this._initCamera();

    }

    onMouseDown() {
        Game.load()
    }

    _initBox() {



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