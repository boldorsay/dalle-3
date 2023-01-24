let audio1
let audio2
audio1 = new Audio("Sound/door2.mp3");
let loader = document.createElement("div");
loader.id = "loader";


export function closeWindows(top, bottom) {

  audio1.loop = false;
  audio1.play();


  
  top.style.transform = "translateY(100%)";
  bottom.style.transform = "translateY(-100%)";
  
  setTimeout(function(){
 

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
  audio1.currentTime = 0;

}


export function openWindows(top, bottom) {


  audio1.play();
  top.style.transform = "translateY(-100%)";
  bottom.style.transform = "translateY(100%)";

  
  setTimeout(function(){
    loader.style.display = "none"

  }, 2000);

  setTimeout(function(){
    top.style.display = "none"
    bottom.style.display = "none"

  }, 4000);

  

  
}
