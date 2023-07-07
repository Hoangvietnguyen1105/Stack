import * as pc from 'playcanvas'

export class Camera extends pc.Entity {
    constructor() {
        super()
        this.camera = new pc.Entity("camera");
        // Định nghĩa màu gradient
        // Định nghĩa màu ban đầu và màu cuối của gradient
        const startColor = new pc.Color(0, 0, 1); // Xanh
        const endColor = new pc.Color(1, 0, 0); // Đỏ

        // Tạo hướng gradient từ xanh đến đỏ (ví dụ: từ trái sang phải)
        const direction = new pc.Vec3(1, 0, 0); // Hướng từ trái sang phải

        // Lấy giá trị tương đối của điểm trong gradient (từ 0 đến 1)
        const t = 0.5; // Giá trị tương đối (ví dụ: 0.5 nghĩa là 50% trong gradient)

        // Tính toán giá trị màu tại điểm tương đối trong gradient với hướng
        const lerpedColor = new pc.Color().lerp(startColor, endColor, t).clone();
        lerpedColor.r = lerpedColor.r * direction.x;
        lerpedColor.g = lerpedColor.g * direction.y;
        lerpedColor.b = lerpedColor.b * direction.z;

        // Gán màu gradient cho camera
        this.camera.addComponent("camera", {
            clearColor: lerpedColor,
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
    destroy() {
        super.destroy()
    }
}