import * as pc from "playcanvas"

export class Light {
    constructor() {
        this.light = new pc.Entity("light");
        this.light.addComponent("light");
        this.light.setEulerAngles(45, 0, 0);
        this.light.setLocalPosition(0.31886820838302404, 0.4899187862864109, 0.37186466075310176);
        this.light.setLocalEulerAngles(1.1789746986356417, 40.612579831019055, -6.546477175459289e-17)

    }
}

