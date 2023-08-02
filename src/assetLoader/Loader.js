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
                new pc.Asset("clound", "texture", {
                    url: 'assets/sprites/clouds.jpg',
                }),
                new pc.Asset("replay", "texture", {
                    url: 'assets/sprites/replay.png',
                }),
                new pc.Asset("ice", "texture", {
                    url: 'assets/sprites/ice.png',
                }),
                new pc.Asset("gradient", "texture", {
                    url: 'assets/sprites/gradient.png',
                }),
                new pc.Asset("playcanvas", "texture", {
                    url: 'assets/sprites/playcanvas.png',
                }),
                new pc.Asset("jShine", "texture", {
                    url: 'assets/sprites/JShine.jpg',
                }),
                new pc.Asset("gameSound", "audio", {
                    url: 'assets/sprites/audio/GameSound.mp3',
                }),
                new pc.Asset("gameOver", "audio", {
                    url: 'assets/sprites/audio/gameOver.mp3',
                }),
                new pc.Asset("notPerfect", "audio", {
                    url: 'assets/sprites/audio/notPerfect.mp3',
                }),
                new pc.Asset("skin", "texture", {
                    url: 'assets/sprites/skin.png',
                }),
                new pc.Asset("image2", "texture", {
                    url: 'assets/sprites/spr_building_2.png'
                }),
                new pc.Asset("font", "font", {
                    url: "assets/sprites/fonts/THEBOLDFONT.json",
                }),
                new pc.Asset("perfect", "texture", {
                    url: "assets/sprites/tex_rectangle.png",
                }),
                new pc.Asset("perfect123", "texture", {
                    url: "assets/sprites/spr_stroke.png",
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
    static createCanvasFont(name, fontSize, fontWeight) {
        let canvasFontArial = new pc.CanvasFont(this.app, {
            color: new pc.Color(1, 1, 1),
            fontName: name,
            fontSize: fontSize,
            fontWeight: fontWeight,
        });
        canvasFontArial.createTextures("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-+/():;%&`'*#=[]\"");
        let fontAsset = new pc.Asset("CanvasFont", "font", {});
        fontAsset.resource = canvasFontArial;
        fontAsset.loaded = true;
        this.app.assets.add(fontAsset);
        this.assets.push(fontAsset);
        return fontAsset;
    }
    
}
