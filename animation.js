let audio1
let audio2

export function closeWindows(top, bottom) {

  audio1 = new Audio("Sound/door2.mp3");
  audio1.loop = false;
  audio1.play();

  
  top.style.transform = "translateY(100%)";
  bottom.style.transform = "translateY(-100%)";
  
  setTimeout(function(){
    let loader = document.createElement("div");
    loader.id = "loader";

    let moon1 = document.createElement("div");
    moon1.id = "moon1";

    let moon2 = document.createElement("div");
    moon2.id = "moon2";

    let moon3 = document.createElement("div");
    moon3.id = "moon3";

    let moon4 = document.createElement("div");
    moon4.id = "moon4";

    loader.appendChild(moon1);
    loader.appendChild(moon2);
    loader.appendChild(moon3);
    loader.appendChild(moon4);

    document.body.appendChild(loader);
    console.log("in animation");
  }, 5000);
}


export function openWindows(top, bottom) {

  audio1.pause();
  audio1.src = '';
  audio1 = null;
    loader.style.display = "none"
    audio2 = new Audio("Sound/door.mp3");
    audio2.loop = false;
    audio2.play();
  top.style.transform = "translateY(-100%)";
  bottom.style.transform = "translateY(100%)";

  

  

  
}
