import * as THREE from "three";
import { DeviceOrientationControls } from "./DeviceOrientationControls.js";

export const sphere = () => {
  let camera, scene, renderer, controls;
  let action = false;
  let texture;
  let ctx;
  const startButton = document.getElementById("startButton");

  function addTexture(canvas) {
    ctx = canvas.getContext("2d");
    texture = new THREE.CanvasTexture(ctx.canvas);
    // texture =  new THREE.TextureLoader().load( 'public/img/test.jpg');
    init();
  }


  function init() {
    const overlay = document.getElementById("overlay");
    overlay.remove();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1100
    );

    controls = new DeviceOrientationControls(camera);
    scene = new THREE.Scene();

    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: false,
    });
    const helper = new THREE.Mesh(helperGeometry, helperMaterial);
    scene.add(helper);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.zIndex = 10;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = 0;

    

    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener("resize", onWindowResize, false);

    animate();
  }

  function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {init, animate, addTexture};
};
