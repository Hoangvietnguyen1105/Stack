import * as pc from "playcanvas"

export class Light {
    constructor() {
        this.light = new pc.Entity("light");
        this.light.addComponent("light");


    }
}

