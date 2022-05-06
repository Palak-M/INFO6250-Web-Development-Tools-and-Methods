/*I have referred this link for implementing webcam functionality: https://github.com/Nigama-oss/Sign-language/blob/main/Template%20code/src/utilities.js
I have already discussed with Professor about using this.*/

// Define our labelmap
const labelMap = {
  1: { name: "Hello", color: "red" },
  3:{name:'I Love You', color:'lime'},
  5:{name:'No', color:'purple'},
  /*2:{name:'Thank You', color:'yellow'},
    4:{name:'Yes', color:'blue'},
*/
};
// Define a drawing function
export const drawRect = (
  boxes,
  classes,
  scores,
  threshold,
  imgWidth,
  imgHeight,
  ctx,
  Correct,
  CIdx,
  ans,setAns
) => {
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      // Extract variables
      const [y, x, height, width] = boxes[i];
      const text = classes[i];
      console.log(CIdx, text)
      if(text !== CIdx )continue;
      // Set styling
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 10;
      ctx.fillStyle = "white";
      ctx.font = "30px Arial"; 

      // DRAW!!
      ctx.beginPath();
      ctx.fillText(
        labelMap[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
        x * imgWidth,
        y * imgHeight - 10
      );

      if (labelMap[text]["name"] === "Hello") {
        Correct = true;
      }
      ctx.rect(
        x * imgWidth,
        y * imgHeight,
        (width * imgWidth) / 2,
        (height * imgHeight) / 1.5
        );
        ctx.stroke();
        return true;
    }
  }
};
