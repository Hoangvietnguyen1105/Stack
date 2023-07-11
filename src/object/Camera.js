import * as pc from 'playcanvas'

export class Camera extends pc.Entity {
    constructor() {
        super()
        this.camera = new pc.Entity("camera");
        this.camera.addComponent("camera", {
            clearColor: new pc.Color(131 / 255, 221 / 255, 224 / 255),
        });

        this.camera.setLocalPosition(0.612, 1.134, 0.596);
        this.camera.setLocalEulerAngles(-33.95, 45.69, 0)
        this.camera.setLocalScale(1, 1, 1)
        this.camera.addComponent("script");



        // this.camera.script.create("orbitCamera", {
        //     attributes: {
        //         inertiaFactor: 0.3,
        //         // distance: 10, // Khoảng cách ban đầu giữa camera và điểm nhìn
        //         maxDistance: 2000, // Khoảng cách tối đa mà camera có thể đi xa điểm nhìn
        //         minDistance: 50, // Khoảng cách tối thiểu mà camera có thể đi gần điểm nhìn
        //         // pitchAngle: 45, // Góc nghiêng ban đầu của camera
        //         // yawAngle: 90, // Góc quay ban đầu của camera quanh điểm nhìn
        //         // inertiaEnabled: true, // Override default of 0 (no inertia)
        //     },
        // });


        // this.camera.script.create("orbitCameraInputMouse");
        // this.camera.script.create("orbitCameraInputTouch");


    }
    update(dt) {

    }
    destroy() {
        super.destroy()
    }
}