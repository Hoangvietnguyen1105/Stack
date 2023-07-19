import { Application, ElementInput, Keyboard, Mouse, TouchDevice, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO, WasmModule, EVENT_KEYDOWN, KEY_R } from "playcanvas";
import { Loader } from './assetLoader/Loader.js'
import { Box } from "./object/box";
import { Camera } from "./object/Camera"
import { Light } from "./object/Light"
import { loadObitCameraPlugin } from "../src/orbit-camera";
import { SceneManager } from "./scene/sceneManager";
import { PlayScene } from "./scenes/playScene";
import { GameConstant } from "./gameConstant"
import { StartScene } from "./scenes/startScene";
export class Game {


    static init() {
        //init
        const canvas = document.createElement("canvas");
        canvas.width = 720;
        canvas.height = 1280;
        document.body.appendChild(canvas);

        // Tạo đối tượng app và gán cho thuộc tính app của lớp Game
        this.app = new Application(canvas, {
            elementInput: new ElementInput(canvas),
            keyboard: new Keyboard(window),
            mouse: new Mouse(canvas),
            touch: new TouchDevice(canvas),
        });
        //set up screen
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
        this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
        WasmModule.setConfig("Ammo", {
            glueUrl: "assets/libs/ammo.wasm.js",
            wasmUrl: "assets/libs/ammo.wasm.wasm",
            fallbackUrl: "assets/libs/ammo.js",
        });
        loadObitCameraPlugin();
        //load assset before start
        WasmModule.getInstance("Ammo", () => {
            Loader.loadImages(this.app)
                .then((assets) => {
                    console.log("Loading complete");
                    // Tiếp tục công việc sau khi tải hình ảnh thành công
                    this.load();
                })
                .catch((error) => {
                    console.error("Loading failed:", error);
                });
        });

        this.app.systems.rigidbody.gravity.set(0, -1.5, 0);

        Game.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.on("update", (dt) => this.update(dt));


    }
    static onMouseDown() {
        SceneManager.onMouseDown()
    }
    static update(dt) {
        SceneManager.update(dt)
    }
    static replay() {
        this.app.start()

        SceneManager.init([
            new StartScene(),
        ]);
        SceneManager.loadScene(SceneManager.getScene('StartScene'));

    }
    static load() {
        this.app.start()

        SceneManager.init([
            new PlayScene(), new StartScene(),
        ]);
        SceneManager.loadScene(SceneManager.getScene(GameConstant.SCENE_PLAY));
    }


}

window.onload = () => {
    Game.init()
};
