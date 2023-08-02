import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";

export class Plane2 extends Entity {
    constructor() {
        super();
        this.plane = new pc.Entity("plane");
        this.createMateria();

        const mesh = pc.createPlane(Game.app.graphicsDevice, {
            width: 1,
            height: 1,
        });

        const meshInstance = new pc.MeshInstance(mesh, this.material);

        this.plane.addComponent("render", {
            type: "asset",
            castShadows: false,
            receiveShadows: false,
            meshInstances: [meshInstance],
        });

        this.addChild(this.plane);
        Game.app.on("update", (dt) => this.update(dt));
    }




    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color(1, 1, 1);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;

        const perfect = Loader.getAssetByKey('perfect').resource;
        perfect.rgbm = true
        this.material.opacity = 1;

        this.material.diffuseMap = perfect
        // Thiết lập blend type thành alpha
        this.material.blendType = pc.BLEND_NORMAL;

        // Thiết lập color channel thành A
        this.material.alphaChannel = pc.ALPHA_CHANNEL_ALPHA;

        // Thiết lập opacity map là texture perfect
        this.material.opacityMap = perfect;

        // Thiết lập intensity

        // Thiết lập alphaTest
        this.material.alphaTest = 0;


        // Cập nhật vật liệu
        this.material.update();



    }
    update(dt) {
        if (this.material.opacity > 0) {
            this.material.opacity -= 0.030
            this.material.update()
        }
        this.plane.setLocalScale(this.plane.getLocalScale().x + this.plane.getLocalScale().x * 0.2 * dt, this.plane.getLocalScale().y, this.plane.getLocalScale().z + this.plane.getLocalScale().z * 0.2 * dt)
    }

    destroy() {
        super.destroy()
    }

}
