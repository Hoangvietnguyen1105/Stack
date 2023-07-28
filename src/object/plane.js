import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";

export class Plane extends Entity {
    constructor() {
        super()
        this.plane = new pc.Entity("plane");
        this.createMateria()
        this.plane.addComponent("render", {
            type: "plane",
            material: this.material,
        });

        this.addChild(this.plane)
        Game.app.on("update", (dt) => this.update(dt));

    }



    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color(1, 1, 1);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;
        this.material.update();

        const perfect = Loader.getAssetByKey('perfect').resource;
        perfect.rgbm = true
        this.material.opacity = 1;
        this.material.emissive = new pc.Color(2, 2, 2);
        // Thiết lập blend type thành alpha
        this.material.blendType = pc.BLEND_NORMAL;

        // Thiết lập color channel thành A
        this.material.alphaChannel = pc.ALPHA_CHANNEL_ALPHA;

        // Thiết lập opacity map là texture perfect
        // this.material.opacityMap = perfect;

        // Thiết lập intensity

        // Thiết lập alphaTest
        this.material.alphaTest = 0;

        // Cập nhật vật liệu
        this.material.update();



    }
    update(dt) {
        if (this.material.opacity > 0) {
            this.material.opacity -= 0.015
            this.material.update()
        }
    }

    destroy() {
        super.destroy()
    }

}
