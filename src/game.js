import { Application, ElementInput, Keyboard, Mouse, TouchDevice, ElementComponent, Texture, Entity, ImageElement, Vec2, Vec4 } from "playcanvas";
import { Loader } from './assetLoader/Loader'
import { box } from "./object/box";
import { Camera } from "./object/Camera"
import { Light } from "./object/Light"
import { loadObitCameraPlugin } from "../src/orbit-camera";
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


    }
    static load() {
        const material = new pc.StandardMaterial();
        material.useMetalness = true;
        material.gloss = 1.3;
        material.metalness = 0.4;

        material.update();

        this.box = new box()
        this.app.root.addChild(this.box.box);

        // create camera entity
        this.camera = new Camera()
        this.app.root.addChild(this.camera.camera);
        // create directional light entity
        this.light = new Light()
        this.app.root.addChild(this.light.light);
        // create an update 
        this.app.on("update", (dt) => {
            // this.box.box.rotate(10 * dt, 20 * dt, 30 * dt)
            this.box.update(dt)

        });

        this.app.start()
    }




}

window.onload = () => {
    Game.init()
};
