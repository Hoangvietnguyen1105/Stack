import * as pc from "playcanvas"

export class Light extends pc.Entity {
    constructor() {
        super()
        this.light = new pc.Entity("light");
        this.light.addComponent("light");
    }
    destroy() {
        super.destroy()
    }
}

