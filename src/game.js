import { Application, ElementInput, Keyboard, Mouse, TouchDevice, ElementComponent, Texture, Entity, ImageElement, Vec2, Vec4 } from "playcanvas";
import { Loader } from './assetLoader/Loader.js'
import { box } from "./object/box";
import { Camera } from "./object/Camera"
import { Light } from "./object/Light"
import { loadObitCameraPlugin } from "../src/orbit-camera";
import { SceneManager } from "./scene/sceneManager";
import { PlayScene } from "./scenes/playScene";
import { GameConstant } from "./gameConstant"
import { StartScene } from "./scenes/startScene";
export class Game {


    static init() {
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
        loadObitCameraPlugin();
        //load assset before start
        Loader.loadImages(this.app)
            .then((assets) => {
                console.log("Loading complete");
                // Tiếp tục công việc sau khi tải hình ảnh thành công
                this.load();
            })
            .catch((error) => {
                console.error("Loading failed:", error);
            });

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
        SceneManager.init([
            new StartScene(),
        ]);
        SceneManager.loadScene(SceneManager.getScene('StartScene'));
        this.app.start()

    }
    static load() {
        SceneManager.init([
            new PlayScene(), new StartScene(),
        ]);
        SceneManager.loadScene(SceneManager.getScene(GameConstant.SCENE_PLAY));
        this.app.start()
    }


}

window.onload = () => {
    Game.init()
};
