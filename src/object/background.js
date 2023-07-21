import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";
import { FILES } from "./shader";
// Định nghĩa nội dung của hai tệp shader


export class Background extends Entity {
  
    constructor() {
        super();
        this.createMateria();
        this.Background = new pc.Entity("Background");
        this.Background.addComponent("render", {
            type: "plane",
            // material: this.material,
        });
        this.Background.setLocalPosition(0, 0.5, 0);
        this.Background.setLocalScale(0.1, 0.1, 0.1);
        this.addChild(this.Background);
    }

    createMateria() {
        // Tạo shader từ nội dung vertex và fragment shader
        const shader = pc.createShaderFromCode(
            Game.app.graphicsDevice,
            FILES["shader.vert"],
            FILES["shader.frag"],
            "myUIShader",
            {
                vertex_position: pc.SEMANTIC_POSITION,
                vertex_texCoord0: pc.SEMANTIC_TEXCOORD0,
            }
        );

        // Tạo một vật liệu mới với shader mới và blending additive alpha
        const material = new pc.Material();
        material.shader = shader;
        material.blendType = pc.BLEND_ADDITIVEALPHA;
        material.depthWrite = true;
        material.setParameter("uDiffuseMap", Loader.getAssetByKey('playcanvas').resource);
        material.update();

        // Tạo phần tử hình ảnh UI với vật liệu tùy chỉnh
        const entity = new pc.Entity();
        entity.addComponent("element", {
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            width: 350,
            height: 350,
            type: pc.ELEMENTTYPE_IMAGE,
        });
        const screen = new pc.Entity();
            screen.addComponent("screen", {
                referenceResolution: new pc.Vec2(1280, 720),
                scaleBlend: 0.5,
                scaleMode: pc.SCALEMODE_BLEND,
                screenSpace: true,
            });
        this.addChild(screen)
        entity.element.material = material;
        screen.addChild(entity);
        let time = 0;
            Game.app.on("update", (dt) => {
                time += dt * 0.5;
                // animate the amount as a sine wave varying from 0 to 1
                material.setParameter("amount", (Math.sin(time * 4) + 1) * 0.5  );
            });
    }

    update(dt) {
        // Mã cập nhật của bạn ở đây (nếu cần)
    }

    destroy() {
        super.destroy();
    }
}
