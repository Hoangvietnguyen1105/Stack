import { Entity } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
export class planeBackground extends Entity {
    constructor() {
        super();
        this.createTexture(3, 252, 173, 3, 202, 252);
        this.startColor =Config.color1.backGroundColor1;
        this.endColor = Config.color1.backGroundColor2;
        this.colorTransitionSpeed = 2.5;
        this.nextColor = 0
        // this.nex
        this.createMateria();

        this.Background = new pc.Entity("Background");
        this.Background.addComponent("render", {
            type: "plane",
            material: this.material,
        });
        this.Background.setLocalPosition(-10.597, -9.913, -11.403);
        this.Background.setEulerAngles(149.72, 22.99, 119.78);
        this.Background.setLocalScale(20, 1, 40);
        this.addChild(this.Background);
        //Game.app.on("update", (dt) => this.update(dt));

    }

    createTexture(r1, g1, b1, r2, g2, b2) {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext("2d");

        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
        gradient.addColorStop(1, `rgb(${r2},${g2},${b2})`);

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new pc.Texture(Game.app.graphicsDevice, {
            width: canvas.width,
            height: canvas.height,
        });
        texture.setSource(canvas);
        this.currentTexture = texture;
    }

    createMateria() {
        this.material = new pc.StandardMaterial();
        this.material.diffuseMap = this.currentTexture;
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;
        this.material.update();
    }

    updateTextureCanvas(r1, g1, b1, r2, g2, b2) {
        const context = this.currentTexture.getSource().getContext("2d");

            const gradient = context.createLinearGradient(
                0,
                0,
                this.currentTexture.width,
                0
            );
        gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
        gradient.addColorStop(1, `rgb(${r2},${g2},${b2})`);

        context.fillStyle = gradient;
        context.fillRect(0, 0, this.currentTexture.width, this.currentTexture.height);
    }

    update(dt) {

        const step = this.colorTransitionSpeed * dt;
        for (let i = 0; i < 6; i++) {
            this.startColor[i] = pc.math.lerp(
                this.startColor[i],
                this.endColor[i],
                step
            );
            
        }

        // Cập nhật màu trực tiếp trên canvas của texture
        this.updateTextureCanvas(
            this.startColor[0],
            this.startColor[1],
            this.startColor[2],
            this.startColor[3],
            this.startColor[4],
            this.startColor[5]
        )
     
       
        if (Math.abs(this.startColor[0] - this.endColor[0]) <= 0.1 &&
            Math.abs(this.startColor[1] - this.endColor[1]) <= 0.1 &&
            Math.abs(this.startColor[2] - this.endColor[2]) <= 0.1 &&
            Math.abs(this.startColor[3] - this.endColor[3]) <= 0.1 &&
            Math.abs(this.startColor[4] - this.endColor[4]) <= 0.1 &&
            Math.abs(this.startColor[5] - this.endColor[5]) <= 0.1) {
            console.log(this.nextColor)
            // Quá trình lerp hoàn thành
            this.startColor = Config.color1[`backGroundColor${this.nextColor + 1}`];
            if(this.nextColor  === 3 ){
                this.nextColor = 0 
            }
            this.endColor =  Config.color1[`backGroundColor${this.nextColor + 2}`];
            this.nextColor++
            
        }
        // Cập nhật texture lên GPU
        this.currentTexture.upload();
        this.material.diffuseMap = this.currentTexture;
        this.material.update();
    }

    destroy() {
        super.destroy();
    }
}
