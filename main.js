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
  let debug = document.querySelector("#debug");
  let prompt;


  createWebcam({
    element: camera,
    constraints: {
      video: { width: window.innerHeight, height: window.innerWidth, facingMode: "environment" },
    },
  })
  // Envoi de la premiere photo a openai

  btnCamera.onclick = async () => {


    requestPermission();

    // camera.pause()

    retry.style.display = "block"
    btnCamera.style.display = "none"
    buttonSend.style.display = "block"

     door.style.display = 'block'



  };

  buttonSend.onclick = async () => {


    // door.style.display = 'none'
    const sphereObj = sphere();

    buttonSend.style.display = "none"
    retry.style.display = "none"
    
    let imgScreen = await cameraToImage(camera);
    


    


    
      closeWindows(imageTop, imageBottom);
      const imageRight = await transfert(imgScreen, 0.2, 0.5, 0.7, prompt, 1024);
      // debug.appendChild(imageRight)
      // addName("imageRight", debug)

      // // 
      const imgLeft = await transfert(imgScreen, 0.5, 0.3, 0, prompt, 1024)
      const [imageCenter, canvasLarge] = await exportCenter(imageRight, imgLeft)
      
      
      // display the image on the body
      
      // debug.appendChild(imgScreen)
      // addName("imageScreen", debug)
   
      // debug.appendChild(imgLeft)
      // addName("imgLeft", debug)
      // debug.appendChild(canvasLarge)
      // addName("canvasLarge", debug)
      // debug.appendChild(imageCenter)
      // addName("imageCenter", debug)
      
      
      const imageMiddle = await transfertMiddle(imageCenter, 1024, prompt)
      const imageFinal = await showImage(canvasLarge, imageMiddle);
      
      // debug.appendChild(imageMiddle)
      // addName("imageMiddle", debug)
      
      // document.body.appendChild(imageFinal)
      // addName("imageFinal", debug)


      
      openWindows(imageTop, imageBottom);

       sphereObj.addTexture(imageFinal);
  };



  arrow.addEventListener("touchstart", function (event) {
    let text = document.querySelector("#text");
    prompt = text.value;

    camera.style.display="block"
    btnCamera.style.display="block"

    content.style.display = "none";
    document.body.style.maxHeight= "100vh";
    document.body.style.overflowY = "hidden"; 






    

  });

  retry.addEventListener("touchstart", function (event) {
    console.log("out");

    camera.play()
    retry.style.display = "none"
    btnCamera.style.display = "block"
    buttonSend.style.display = "none"
  
  });

  function addName(name, div){

    let newElement = document.createElement("p");
    newElement.innerHTML = name;
    div.appendChild(newElement)
    
  }

  function requestPermission() {

// run once on load

    // iOS 13+

    if (
      window.DeviceOrientationEvent !== undefined &&
      typeof window.DeviceOrientationEvent.requestPermission === "function"
    ) {
      window.DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          if (response == "granted") {
            window.addEventListener(
              "orientationchange",
              onScreenOrientationChangeEvent,
              false
            );
            window.addEventListener(
              "deviceorientation",
              onDeviceOrientationChangeEvent,
              false
            );
          }
        })
        .catch(function (error) {
          console.error(
            error
          );
        });
    } else {
      window.addEventListener(
        "orientationchange",
        onScreenOrientationChangeEvent,
        false
      );
      window.addEventListener(
        "deviceorientation",
        onDeviceOrientationChangeEvent,
        false
      );
    }

    // scope.enabled = true;
  
  }



  


};
