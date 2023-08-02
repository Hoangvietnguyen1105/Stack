import { Loader } from "../assetLoader/Loader.js";

export class Audio {
    static _initAudio(obj) {
        obj.addComponent("sound");

        const perfect1 = Loader.getAssetByKey('perfectAudio1');
        obj.sound.addSlot("perfect1", {
            asset: perfect1,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect2 = Loader.getAssetByKey('perfectAudio2');
        obj.sound.addSlot("perfect2", {
            asset: perfect2,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect3 = Loader.getAssetByKey('perfectAudio3');
        obj.sound.addSlot("perfect3", {
            asset: perfect3,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect4 = Loader.getAssetByKey('perfectAudio4');
        obj.sound.addSlot("perfect4", {
            asset: perfect4,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect5 = Loader.getAssetByKey('perfectAudio5');
        obj.sound.addSlot("perfect5", {
            asset: perfect5,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect6 = Loader.getAssetByKey('perfectAudio6');
        obj.sound.addSlot("perfect6", {
            asset: perfect6,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });

        const perfect7 = Loader.getAssetByKey('perfectAudio7');
        obj.sound.addSlot("perfect7", {
            asset: perfect7,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });
        const gameSound = Loader.getAssetByKey('gameSound');
        obj.sound.addSlot("gameSound", {
            asset: gameSound,
            pitch: 1.7,
            loop: true,
            autoPlay: false,
        });
        const notPerfect = Loader.getAssetByKey('notPerfect');
        obj.sound.addSlot("notPerfect", {
            asset: notPerfect,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });
        const gameOver = Loader.getAssetByKey('gameOver');
        obj.sound.addSlot("gameOver", {
            asset: gameOver,
            pitch: 1.7,
            loop: false,
            autoPlay: false,
        });
    }
}
