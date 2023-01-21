// Put variables in global scope to make them available to the browser console.

let video;

export async function createWebcam({ element, constraints }) {
  video = element;
  video.autoplay = true;
  video.muted = true;
  video.setAttribute("playsinline", "true");

  constraints = {
    audio: false,
    video: true,
    ...constraints,
  };

  const stream = await navigator.mediaDevices
    .getUserMedia(constraints)
    .catch((error) => {
      if (error.name === "ConstraintNotSatisfiedError") {
        console.error(
          `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        console.error(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      } else {
        console.error(`getUserMedia error: ${error.name}`, error);
      }
    });

  const videoTracks = stream.getVideoTracks();
  // console.log("Got stream with constraints:", constraints);
  // console.log(`Using video device: ${videoTracks[0].label}`);
  stream.onremovetrack = () => {
    console.log("Stream ended");
  };

  video.srcObject = stream;

  await new Promise((resolve) => {
    video.oncanplay = () => {
      video.width = video.videoWidth;
      video.height = video.videoHeight;
      video.play();
      resolve(video);
    };
  });
}

export async function cameraToImage(cam) {
  // console.log(camera)
  // create a canvas element

  let canvas = document.createElement("canvas");
  // take a screenshot of the cam and put it on the canvas
  canvas.width = cam.width;
  canvas.height = cam.height;
  canvas.getContext("2d").drawImage(cam, 0, 0, canvas.width, canvas.height);

  // extract the image data from the canvas

  var dataURL = canvas.toDataURL();

  let img = new Image();

  img.src = dataURL;

  // Return the image element
  return new Promise((resolve) => {
    img.onload = () => resolve(img);
  });
}
export async function canvasToImage(canvastoIMG) {
  // create a canvas element
  let canvas = document.createElement("canvas");
  // take a screenshot of the img and put it on the canvas
  canvas.width = canvastoIMG.width;
  canvas.height = canvastoIMG.height;



  canvas
    .getContext("2d")
    .drawImage(canvastoIMG, 0, 0, canvas.width, canvas.height);
  // extract the image data from the canvas
  let dataURL = canvas.toDataURL();

  let img = new Image();

  img.src = dataURL;

  // Return the image element

  return new Promise((resolve) => {
    img.onload = () => resolve(img);
  });
}
