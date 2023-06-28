import * as pc from 'playcanvas'

export class Camera {
    constructor() {
        this.camera = new pc.Entity("camera");
        this.camera.addComponent("camera", {
            clearColor: new pc.Color(0.5, 0.6, 0.9),
        });

        this.camera.setLocalPosition(0.5530560612678528, 1.0613877773284912, 0.5824261903762817);
        this.camera.setLocalEulerAngles(-34.952011300760084, 43.51833020722977, 0)
        this.camera.setLocalScale(1, 1, 1)
        this.camera.addComponent("script");



        // this.camera.script.create("orbitCamera", {
        //     attributes: {
        //         inertiaFactor: 0.3,
        //         // distance: 10, // Khoảng cách ban đầu giữa camera và điểm nhìn
        //         // maxDistance: 20, // Khoảng cách tối đa mà camera có thể đi xa điểm nhìn
        //         // minDistance: 5, // Khoảng cách tối thiểu mà camera có thể đi gần điểm nhìn
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
}