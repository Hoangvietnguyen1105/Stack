// skyboxMaterial.js
import { StandardMaterial } from "playcanvas";
import { Loader } from "../assetLoader/Loader";

export function createSkyboxMaterial() {
    const material = new StandardMaterial();
    material.useSkybox = true;
    material.skyboxIntensity = 1.0;

    // Gắn các hình ảnh của Skybox vào từng hướng tương ứng
    // Gắn các tệp hình ảnh riêng lẻ cho các hướng: top, bottom, front, back, left, right
    material.cubeMap = {
        128: Loader.getAssetByKey('gradient').resources,
        256: Loader.getAssetByKey('gradient').resources,
        512: Loader.getAssetByKey('gradient').resources,
        1024: Loader.getAssetByKey('gradient').resources,
        2048: Loader.getAssetByKey('gradient').resources,
        4096: Loader.getAssetByKey('gradient').resources,
    }
    return material;
}
