export class physics {
    static physics(box, type) {

        box.box.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(box.box.getLocalScale().x / 2, box.box.getLocalScale().y / 2, box.box.getLocalScale().z / 2), // Kích thước của vùng va chạm thu nhỏ
        });
        box.box.addComponent("rigidbody", {
            type: type,
            mass: 50,
            restitution: 0.5,
        });
    }
}