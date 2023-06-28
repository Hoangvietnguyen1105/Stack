import { Entity } from "playcanvas";
import { UIManager } from "../ui/uiManager";
export class Scene extends Entity {
    constructor(key) {
        super(key);
        this.key = key;
        this.ui = new UIManager();
        this.addChild(this.ui);
    }

    create() {
    }

    update() {
    }

    resize() {
    }

    pause() {
    }

    resume() {
    }

    destroy() {
        super.destroy();
    }
}
