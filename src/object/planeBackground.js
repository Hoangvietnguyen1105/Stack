import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";
import { FILES } from "./shader";
// Định nghĩa nội dung của hai tệp shader


export class planeBackground extends Entity {
  
    constructor() {
        super();
        this.createMateria();
        this.Background = new pc.Entity("Background");
        this.Background.addComponent("render", {
            type: "plane",
            material: this.material,
        });
        this.Background.setLocalPosition(-10.597, -9.913 ,-11.403);
        this.Background.setEulerAngles(149.72,22.99,119.78)
        this.Background.setLocalScale(20, 1, 40);
        this.addChild(this.Background);
    }

    createMateria() {
        // Tạo một canvas và lấy context 2D
            const canvas = document.createElement("canvas");
            canvas.width = 256; // Đặt chiều rộng của ảnh
            canvas.height = 256; // Đặt chiều cao của ảnh
            const context = canvas.getContext("2d");

            // Tạo gradient từ trái qua phải
            const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, "rgb(3, 252, 173)"); // Màu bắt đầu là màu đỏ
            gradient.addColorStop(1, "rgb(3, 202, 252)"); 
            
            // Đổ gradient lên canvas
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Tạo texture từ canvas
            const texture = new pc.Texture(Game.app.graphicsDevice, {
            width: canvas.width,
            height: canvas.height,
            });
            texture.setSource(canvas);



        const tex = Loader.getAssetByKey('jShine')
        this.material = new pc.StandardMaterial();
        // this.material.useMetalness = true;
        // this.material.diffuse = new pc.Color().fromString(Config.color2['firstColor']);
        this.material.diffuseMap = texture
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;

      
 
        this.material.update();

    }

    update(dt) {
        // Mã cập nhật của bạn ở đây (nếu cần)
    }

    destroy() {
        super.destroy();
    }
}
