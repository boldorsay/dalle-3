

export function closeWindows(top, bottom) {
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
  top.style.transform = "translateY(100%)";
  bottom.style.transform = "translateY(-100%)";

  moon1.style.dip;
}

export function openWindows(top, bottom) {

    loader.style.display = "none"
  top.style.transform = "translateY(-100%)";
  bottom.style.transform = "translateY(100%)";

  
}
