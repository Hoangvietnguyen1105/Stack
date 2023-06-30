import { box } from "../object/box";
export class LogicPlayScene {
    /**
     * 
     * @param {Box} currentBox - Đối tượng box thứ nhất
     * @param {Box} oldBox - Đối tượng box thứ hai
     */
    static splitting(currentBox, oldBox) {
        console.log(oldBox.box.getLocalScale())
        const boxStay = new box()
        boxStay.box.setLocalScale(oldBox.box.getLocalScale().x, oldBox.box.getLocalScale().y, oldBox.box.getLocalScale().z)
        boxStay.box.setLocalPosition(oldBox.box.getLocalPosition().x, oldBox.box.getLocalPosition().y, oldBox.box.getLocalPosition().z)

        boxStay.moveLeft = false
        boxStay.moveDown = false
        boxStay.moveRight = false
        boxStay.moveUp = false
        boxStay.shouldChangeDirection = false;
        // console.log((box2.box.getLocalPosition().x + box2.box.getLocalScale().x / 2))
        // console.log(box1.box.getPosition().x)
        return boxStay
    }
}
