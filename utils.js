export async function canvasToFile(canvas, name = "image.png") {
  return await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], name);
      blobToImage(blob);
      resolve(file);
    }, "image/png");
  });
}

export function blobToImage(blob) {
  const img = new Image();
  const imageUrl = URL.createObjectURL(blob);
  img.src = imageUrl;

  return img;
}

export function loadImage(url) {
  const img = new Image();

  return new Promise((resolve) => {
    img.onload = () => resolve(img);
    img.src = url;
  });
}
