// Hàm tính toán màu tương phản từ màu đầu và màu cuối của gradient

  export class calculateColor{
    constructor(){

    }


    static calculateContrastingColor(firstColor, endColor) {
      const contrastingColor = [];
      for (let i = 0; i < 3; i++) {
        // Tính toán màu tương phản bằng cách lấy giá trị trung bình của màu đầu và màu cuối
        contrastingColor[i] = Math.floor((firstColor[i] + endColor[i]) / 2);
      }
      return contrastingColor;
    }


    static smoothChangingcolor(color1, color2) {
      const steps = 7
      const colorStepArray = [];
      for (let step = 0; step < steps; step++) {
        const colorStep = [];
        for (let i = 0; i < 3; i++) {
          colorStep[i] = Math.floor(color1[i] + (color2[i] - color1[i]) * step / steps);
        }
        colorStepArray.push(colorStep)
      }

      return colorStepArray;
    }
    
    

  }
  
