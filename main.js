import { exportCenter, transfert, transfertMiddle, showImage, saveTheImage } from "./action";
import { addTexture } from "./sphere";
import { createWebcam, cameraToImage } from "./webcam";

const camera = document.querySelector("#videoCamera");
const canvas = document.querySelector("#canvas");
const btnCamera = document.querySelector("#btnCamera");
const app2 = document.querySelector("#app2");


createWebcam({
  element: camera,
  constraints: {
    video: { facingMode: "environment" },
  },
}).then((e) => {
  btnCamera.disabled = false;
}); 


  // Envoi de la premiere photo a openai
  

  btnCamera.onclick = async () => {
    // btnCamera.disabled = true;
    // let imgScreen =  await cameraToImage(camera);
    
    // const imageRight = await transfert(imgScreen, 0.3, 0.7, 0, "student bedroom", 1024)
    // const imgLeft = await transfert(imgScreen, 0, 0.3, 0.7, "student bedroom", 1024)
    // const [imageCenter, canvasLarge] = await exportCenter(imageRight, imgLeft)


    // // display the image on the body
    
    // const imageMiddle = await transfertMiddle(imageCenter, 1024, "student bedroom")
    // const imageFinal = await showImage(canvasLarge, imageMiddle)
    // document.body.appendChild(imageFinal);

    // addTexture(imageFinal)
    // const imageToThreejs = await saveTheImage(imageFinal)

  };
  

  

  