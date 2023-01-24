import { generateContent } from "./openai";
import { generateTexture, generateTextureMiddle } from "./texturiser";
import { canvasToImage } from "./webcam";





export async function transfert(img, sx, sw, x, prompt, size) {
  const [fileImg, fileMask] = await generateTexture({
    img: img,
    sx: sx,
    sw: sw,
    x: x,
    size,
  });

  prompt =  'image HDRI ' + prompt;


  const imgOpen = await generateContent({
    fileImg,
    fileMask,
    width: size,
    prompt,
  });

  return imgOpen;
}
export async function transfertMiddle(img, size, prompt) {
  const [fileImg, fileMask] = await generateTextureMiddle({
    img: img,
    size: size,
  });

  const imgOpen = await generateContent({
    fileImg,
    fileMask,
    width: size,
    prompt,
  });

  return imgOpen;
}


export async function exportCenter(img1, img2) {
  let canvasLarge = document.createElement("canvas");
canvasLarge.id = "canvasLarge";

  canvasLarge.width = 1024 * 2;
  canvasLarge.height = 1024;
  let ctx = canvasLarge.getContext("2d");


  ctx.drawImage(img2, 0, 0);
  ctx.drawImage(img1, 1024, 0);

  let imageCanvasHtml = await canvasToImage(canvasLarge)



  let canvasCenter = document.createElement('canvas');
  canvasCenter.width = 1024;
  canvasCenter.height = 1024;
  canvasCenter.getContext('2d').drawImage(imageCanvasHtml, 512, 0, 1024, 1024, 0, 0, 1024, 1024);
  canvasCenter.id = "canvasCenter"
  




  let imageCanvasCenterHtml = await canvasToImage(canvasCenter)



  return [imageCanvasCenterHtml, canvasLarge];


}

export async function showImage(canvas, img) {

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 512, 0 , img.width, img.height);

    return canvas;
  
}

export async function saveTheImage(imgToSave) {


  fetch(imgToSave).then(response => {
    return response.blob();
  }).then(blob => {
    const objectURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectURL;
    link.download = 'elementImagehtml.jpg';
    document.body.appendChild(link);
    link.click();
  });
 
}

 