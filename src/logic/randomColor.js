export class Color {
    static _darkerColor(hexColor) {
        const colorValue = parseInt(hexColor.substring(1), 16);
        var R = (colorValue >> 16) & 255;
        var G = (colorValue >> 8) & 255;
        var B = colorValue & 255;
        // Điều chỉnh giá trị bước giảm màu
        if (G > 90) {


            G = Math.max(this._tintColor(G, 'G'), 90)
        }
        else if (R < 255) {
            R = Math.min(255, this._tintColor(R, 'R'))
        }
        else if (B > 90) {
            B = Math.max(this._tintColor(B, 'B'), 90)
        }
        const darkerValue = (R << 16) | (G << 8) | B;
        return '#' + darkerValue.toString(16).padStart(6, '0');
    }
    static _tintColor(RGB, color) {
        if (color === 'G') {
            return RGB - 8
        }
        else if (color === 'R') {
            return RGB + 8
        }
        else if (color === 'B') {
            return RGB - 8
        }
    }
}