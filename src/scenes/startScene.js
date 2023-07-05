import { Scene } from "../scene/scene.js";
import { Game } from "../game";
import { Light } from "../object/Light.js";
import { Camera } from "../object/Camera.js";
import { Box } from "../object/box.js";

export class StartScene extends Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        super.create();
        this._initialize();
        this._initEventListeners();
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
    }

    onMouseDown() {

        // Game.load()
    }

    _initBox() {
        this.box = new Box()
        this.box2 = new Box()
        this.box2.setLocalPosition(this.box.getLocalPosition().x, this.box.getLocalPosition().y + this.box.box.getLocalScale().y, this.box.getLocalPosition().z)
        console.log(this.box.getLocalPosition().y + this.box.getLocalScale().y)
        this.addChild(this.box)
        this.addChild(this.box2)
        // Khởi tạo và thêm các đối tượng box vào scene
    }

    _initCamera() {
        this.camera = new Camera();
        this.addChild(this.camera.camera);
    }

    _initLight() {
        this.light = new Light();
        this.light.light.setLocalEulerAngles(85.63, -58.9, -126.06);
        this.light.light.setLocalPosition(0.5530560612678528, 1.0613877773284912, 0.5824261903762817);
        this.addChild(this.light.light);
    }

    _initEventListeners() {
        document.addEventListener('keydown', this._onKeyDown.bind(this));
    }

    _onKeyDown(event) {
        if (event.key === 'p') {
            Game.load()
        }
    }
}
