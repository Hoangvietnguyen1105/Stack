import * as pc from 'playcanvas';

export class Loader {
    constructor(app) {
        this.assets = [];
    }

    static loadImages(app) {
        this.app = app;
        console.log('sdkfj');
        return new Promise((resolve, reject) => {
            const assets = [
                new pc.Asset("image1", "texture", {
                    url: 'assets/sprites/spr_building_1.png',
                }),
                new pc.Asset("image2", "texture", {
                    url: 'assets/sprites/spr_building_2.png'
                }),
                new pc.Asset("font", "font", {
                    url: "assets/sprites/fonts/courier.json",
                }),
            ];

            const assetListLoader = new pc.AssetListLoader(assets, this.app.assets);
            assetListLoader.load((err, failed) => {
                if (err) {
                    console.error(`${failed.length} assets failed to load`);
                    reject(err);
                } else {
                    console.log(`${assets.length} assets loaded`);
                    this.assets = assets;
                    resolve(assets);
                }
            });
        });
    }

    static getAssetByKey(key) {
        const asset = this.assets.find((asset) => asset.name === key);
        return asset || null;
    }
}
