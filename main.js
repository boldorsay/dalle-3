import eruda from "eruda";
import {
  exportCenter,
  transfert,
  transfertMiddle,
  showImage,
  saveTheImage,
} from "./action";
import { closeWindows, openWindows } from "./animation";
import { sphere } from "./sphere";
import { createWebcam, cameraToImage } from "./webcam";

window.onload = () => {
  eruda.init();
  const camera = document.querySelector("#videoCamera");
  const canvas = document.querySelector("#canvas");
  const btnCamera = document.querySelector("#btnCamera");
  const overlay = document.querySelector("#overlay");
  const app2 = document.querySelector("#app2");

  let imageTop = document.querySelector("#murTop");
  let imageBottom = document.querySelector("#murBottom");
  let door = document.querySelector("#door");

  let arrow = document.querySelector("#arrow");
  let content = document.querySelector("#content");
  let retry = document.querySelector("#retry");
  let buttonSend = document.querySelector("#buttonSend");
  let prompt;
  let imgScreen


  createWebcam({
    element: camera,
    constraints: {
      video: { width: window.innerHeight, height: window.innerWidth, facingMode: "environment" },
    },
  })
  // Envoi de la premiere photo a openai

  btnCamera.onclick = async () => {

     imgScreen = await cameraToImage(camera);


    camera.pause()

    retry.style.display = "block"
    btnCamera.style.display = "none"
    buttonSend.style.display = "block"

    door.style.display = 'block'


    console.log("in");

  };

  buttonSend.onclick = async () => {


    // door.style.display = 'none'
    const sphereObj = sphere();

    buttonSend.style.display = "none"
    retry.style.display = "none"
    


    
      // closeWindows(imageTop, imageBottom);
      const imageRight = await transfert(imgScreen, 0.3, 0.7, 0, prompt, 1024);
      document.body.appendChild(imageRight)
      // 
      const imgLeft = await transfert(imgScreen, 0, 0.3, 0.7, prompt, 1024)
      const [imageCenter, canvasLarge] = await exportCenter(imageRight, imgLeft)
// 
      // 
      // display the image on the body
      // 
      // 
      // 
      const imageMiddle = await transfertMiddle(imageCenter, 1024, prompt)
      const imageFinal = await showImage(canvasLarge, imageMiddle);
      // openWindows(imageTop, imageBottom);
      
      sphereObj.addTexture(imageFinal);
  };



  arrow.addEventListener("touchstart", function (event) {
    let text = document.querySelector("#text");
    prompt = text.value;

    camera.style.display="block"
    btnCamera.style.display="block"

    content.style.display = "none";
    // document.body.style.maxHeight= "100vh";
    // document.body.style.overflowY = "hidden"; 




    

    

  });

  retry.addEventListener("touchstart", function (event) {
    console.log("out");

    camera.play()
    retry.style.display = "none"
    btnCamera.style.display = "block"
    buttonSend.style.display = "none"
  
  });


};
