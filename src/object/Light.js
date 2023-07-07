import * as pc from "playcanvas"

export class Light extends pc.Entity {
    constructor() {
        super()

        this.light = new pc.Entity("light");
        this.light.color = pc.Color.BLACK
        this.light.shadowUpdateMode = pc.SHADOWUPDATE_REALTIME; // Cập nhật bóng liên tục
        this.light.shadowResolution = 1024; // Độ phân giải của bóng
        this.light.shadowBias = 0.05;
        this.light.addComponent("light");
    }
    destroy() {
        super.destroy()
    }
}

