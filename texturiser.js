import { canvasToFile, loadImage } from "./utils";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// cropImage(camera, 0.5, 0.5);

export async function generateTexture({ img, x, sx, sw, size = 1024 }) {
  const ratio = img.width / img.height;

  // will clean up canvas if you resize
  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dw = ratio * canvas.width * sw;
  const xX = canvas.width * x;

  ctx.drawImage(
    img,
    img.width * sx,
    0,
    img.width * sw,
    img.height,
    xX,
    0,
    dw,
    canvas.height
  );







  const imgFile = await canvasToFile(canvas);

  // canvas.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(xX, 0, dw, canvas.height);

  let dataURL = canvas.toDataURL();




  

  const imgMask = await canvasToFile(canvas);


  return [imgFile, imgMask];
}

export async function generateTextureMiddle({ img, size = 1024}) {
  const ratio = img.width / img.height;

  // will clean up canvas if you resize
  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, canvas.width, canvas.height);



  ctx.drawImage(
    img,
    0,
    0,
  );

  const imgFile = await canvasToFile(canvas);

  // canvas.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 256, canvas.height);
  ctx.fillRect(768, 0, 256, canvas.height);

  const imgMask = await canvasToFile(canvas);

  return [imgFile, imgMask];
}

