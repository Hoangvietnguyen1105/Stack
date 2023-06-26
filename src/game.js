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
        this.app.root.addChild(this.box);
        // 
        // this.box2 = new box()
        // this.box2.box.setPosition(0.2, 0.55, 0);
        // this.app.root.addChild(this.box2);


        // create camera entity
        this.camera = new Camera()
        this.app.root.addChild(this.camera.camera);
        this.camera.camera.setPosition(0.5530560612678528, 1.0613877773284912, 0.5824261903762817);
        this.camera.camera.setEulerAngles(-34.952011300760084, 43.51833020722977, 0)
        // create directional light entity
        this.light = new Light()
        this.app.root.addChild(this.light.light);
        // create an update 
        this.app.on("update", (dt) => {
            // this.box.box.rotate(10 * dt, 20 * dt, 30 * dt)
            if (this.camera.camera.getPosition().y < this.temp) {
                this.camera.camera.setPosition(this.camera.camera.getPosition().x, this.camera.camera.getPosition().y + 0.002, this.camera.camera.getPosition().z)
            }
            this.camera.update(dt)

        });
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);

        this.temp2 = this.box.box.getPosition().y

        this.app.start()
    }
    static onMouseDown() {
        const box2 = new box()
        this.temp = this.camera.camera.getPosition().y + box2.box.getLocalScale().y
        this.temp2 += box2.box.getLocalScale().y
        box2.box.setPosition(box2.box.getPosition().x, this.temp2, box2.box.getPosition().z);
        //this.camera.camera.setPosition(this.camera.camera.getPosition().x, this.camera.camera.getPosition().y + box2.box.getLocalScale().y, this.camera.camera.getPosition().z)
        this.app.root.addChild(box2);

    }


}

window.onload = () => {
    Game.init()
};
