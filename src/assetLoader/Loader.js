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
                new pc.Asset("replay", "texture", {
                    url: 'assets/sprites/replay.png',
                }),
                new pc.Asset("skin", "texture", {
                    url: 'assets/sprites/skin.png',
                }),
                new pc.Asset("image2", "texture", {
                    url: 'assets/sprites/spr_building_2.png'
                }),
                new pc.Asset("font", "font", {
                    url: "assets/sprites/fonts/courier.json",
                }),
                new pc.Asset("perfect", "texture", {
                    url: "assets/sprites/tex_rectangle.png",
                }),
                new pc.Asset("perfectAudio1", "audio", {
                    url: "assets/sprites/audio/do.mp3"
                }),
                new pc.Asset("perfectAudio2", "audio", {
                    url: "assets/sprites/audio/re.mp3"
                }),
                new pc.Asset("perfectAudio3", "audio", {
                    url: "assets/sprites/audio/mi.mp3"
                }),
                new pc.Asset("perfectAudio4", "audio", {
                    url: "assets/sprites/audio/fa.mp3"
                }),
                new pc.Asset("perfectAudio5", "audio", {
                    url: "assets/sprites/audio/sol.mp3"
                }),
                new pc.Asset("perfectAudio6", "audio", {
                    url: "assets/sprites/audio/la.mp3"
                }),
                new pc.Asset("perfectAudio7", "audio", {
                    url: "assets/sprites/audio/si.mp3"
                })
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
