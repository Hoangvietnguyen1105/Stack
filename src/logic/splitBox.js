import { Box } from "../object/box";
export class LogicPlayScene {
    /**
     * 
     * @param {Box} currentBox - Đối tượng box thứ nhất
     * @param {Box} oldBox - Đối tượng box thứ hai
     */
    static splitPlane(boxStay, boxFall, change, oldBox, oldoldBox, temp2) {
        this.near = 0.1
        if (change === true) {
            if (oldBox.box.getPosition().x > oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x * this.near && oldBox.box.getPosition().x < oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x / 2) + (oldBox.box.getPosition().x - oldBox.box.getLocalScale().x / 2)) / 2, temp2 - oldBox.box.getLocalScale().y, oldoldBox.box.getPosition().z)
                boxStay.box.setLocalScale((oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x / 2) - (oldBox.box.getPosition().x - oldBox.box.getLocalScale().x / 2), oldoldBox.box.getLocalScale().y, oldoldBox.box.getLocalScale().z)
                boxFall.box.setLocalPosition(((oldBox.box.getPosition().x + oldBox.box.getLocalScale().x / 2) + (oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x / 2)) / 2, temp2 - oldBox.box.getLocalScale().y, oldoldBox.box.getPosition().z)
                boxFall.box.setLocalScale(((oldBox.box.getPosition().x + oldBox.box.getLocalScale().x / 2) - (oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x / 2)), oldoldBox.box.getLocalScale().y, oldoldBox.box.getLocalScale().z)

            }
            else if (oldBox.box.getPosition().x < oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x * this.near && oldBox.box.getPosition().x > oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x) {
                boxStay.box.setLocalPosition(((oldBox.box.getPosition().x + oldBox.box.getLocalScale().x / 2) + (oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x / 2)) / 2, temp2 - oldBox.box.getLocalScale().y, oldoldBox.box.getPosition().z)
                boxStay.box.setLocalScale(((oldBox.box.getPosition().x + oldBox.box.getLocalScale().x / 2) - (oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x / 2)), oldoldBox.box.getLocalScale().y, oldoldBox.box.getLocalScale().z)
                boxFall.box.setLocalPosition(((oldBox.box.getPosition().x - oldBox.box.getLocalScale().x / 2) + (oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x / 2)) / 2, temp2 - oldBox.box.getLocalScale().y, oldoldBox.box.getPosition().z)
                boxFall.box.setLocalScale(((oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x / 2) - (oldBox.box.getPosition().x - oldBox.box.getLocalScale().x / 2)), oldoldBox.box.getLocalScale().y, oldoldBox.box.getLocalScale().z)


            }
            else if (oldBox.box.getPosition().x <= oldoldBox.box.getPosition().x + oldoldBox.box.getLocalScale().x * this.near && oldBox.box.getPosition().x >= oldoldBox.box.getPosition().x - oldoldBox.box.getLocalScale().x * this.near) {
                boxStay.box.setPosition(oldoldBox.box.getPosition().x, oldBox.box.getPosition().y, oldoldBox.box.getPosition().z)
                boxStay.box.setLocalScale(oldoldBox.box.getLocalScale())
                boxFall.destroy()
                boxStay.perfect = true
            }
            else {
                return true
            }
        }
        else {
            if (oldBox.box.getPosition().z > oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z * this.near && oldBox.box.getPosition().z < oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(oldoldBox.box.getPosition().x, temp2 - oldBox.box.getLocalScale().y, ((oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z / 2) + (oldBox.box.getPosition().z - oldBox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(oldoldBox.box.getLocalScale().x, oldoldBox.box.getLocalScale().y, (oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z / 2) - (oldBox.box.getPosition().z - oldBox.box.getLocalScale().z / 2))
                boxFall.box.setLocalPosition(oldoldBox.box.getPosition().x, temp2 - oldBox.box.getLocalScale().y, ((oldBox.box.getPosition().z + oldBox.box.getLocalScale().z / 2) + (oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z / 2)) / 2)
                boxFall.box.setLocalScale(oldoldBox.box.getLocalScale().x, oldoldBox.box.getLocalScale().y, ((oldBox.box.getPosition().z + oldBox.box.getLocalScale().z / 2) - (oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z / 2)))

            }
            else if (oldBox.box.getPosition().z < oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z * this.near && oldBox.box.getPosition().z > oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z) {
                boxStay.box.setLocalPosition(oldoldBox.box.getPosition().x, temp2 - oldBox.box.getLocalScale().y, ((oldBox.box.getPosition().z + oldBox.box.getLocalScale().z / 2) + (oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z / 2)) / 2)
                boxStay.box.setLocalScale(oldoldBox.box.getLocalScale().x, oldoldBox.box.getLocalScale().y, (oldBox.box.getPosition().z + oldBox.box.getLocalScale().z / 2) - (oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z / 2))
                boxFall.box.setLocalPosition(oldoldBox.box.getPosition().x, temp2 - oldBox.box.getLocalScale().y, ((oldBox.box.getPosition().z - oldBox.box.getLocalScale().z / 2) + (oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z / 2)) / 2)
                boxFall.box.setLocalScale(oldoldBox.box.getLocalScale().x, oldoldBox.box.getLocalScale().y, (oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z / 2) - (oldBox.box.getPosition().z - oldBox.box.getLocalScale().z / 2))

            }
            else if (oldBox.box.getPosition().z <= oldoldBox.box.getPosition().z + oldoldBox.box.getLocalScale().z * this.near && oldBox.box.getPosition().z >= oldoldBox.box.getPosition().z - oldoldBox.box.getLocalScale().z * this.near) {
                boxStay.box.setPosition(oldoldBox.box.getPosition().x, oldBox.box.getPosition().y, oldoldBox.box.getPosition().z)
                boxStay.box.setLocalScale(oldoldBox.box.getLocalScale())
                boxFall.destroy()
                boxStay.perfect = true
            }
            else {
                return true
            }
        }
    }
}
