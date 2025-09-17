import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TextureLoader } from "three";

gsap.registerPlugin(ScrollTrigger);
const textureLoader = new TextureLoader();

const tl = gsap.timeline();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const canva = document.querySelector(".canva-main");

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  100
);
camera.position.z = 2.5;
camera.position.y = 0.5;
camera.rotation.x = 1;

const floorColor = textureLoader.load(
  "./textures/floor_texture/aerial_rocks_04_diff_2k.jpg"
);
floorColor.colorSpace = THREE.SRGBColorSpace;
const floorDis = textureLoader.load(
  "./textures/floor_texture/aerial_rocks_04_disp_2k.png"
);
const floorNormal = textureLoader.load(
  "./textures/floor_texture/aerial_rocks_04_nor_gl_2k.exr"
);
const floorRough = textureLoader.load(
  "./textures/floor_texture/aerial_rocks_04_rough_2k.jpg"
);

const ambientalLight = new THREE.AmbientLight(0xffffff, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);

const planeGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  map: floorColor,
  displacementMap: floorDis,
  normalMap: floorNormal,
  roughnessMap: floorRough,
  displacementScale: 1,
});
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;

scene.add(floor, ambientalLight, directionalLight);

const controls = new OrbitControls(camera, canva);
const loader = new GLTFLoader();
// const gui = new GUI();

loader.load("/models/blue_jellyfish/scene.gltf", (gltf) => {
  console.log(gltf, "model");
  const model = gltf.scene;
  model.rotation.x = -1.5;
  model.position.y = 1.3;
  model.position.z = 1;

  scene.add(model);
});

const renderer = new THREE.WebGLRenderer({
  canvas: canva,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);

const resizeScreen = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resizeScreen);

const animation = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};

animation();

tl.to(
  camera.position,
  {
    z: 0.7,
    y: 1,
    x: 2,
    duration: 2,
  },
  0
).to(
  camera.rotation,
  {
    y: 1.5,
    duration: 3,
  },
  0
);

// const cameraFolder = gui.addFolder("camera");
// cameraFolder.add(camera.position, "x", -50, 50, 0.1).name("Posición X");
// cameraFolder.add(camera.position, "y", -50, 50, 0.1).name("Posición Y");
// cameraFolder.add(camera.position, "z", 1, 100, 0.1).name("Distancia Z");

// // Rotaciones en grados (más intuitivo)
// const rotationFolder = cameraFolder.addFolder("Rotación");
// rotationFolder
//   .add(camera.rotation, "x", -180, 180, 1)
//   .name("Rot X (°)")
//   .onChange((value) => {
//     camera.rotation.x = THREE.MathUtils.degToRad(value);
//   });

// rotationFolder
//   .add(camera.rotation, "y", -180, 180, 1)
//   .name("Rot Y (°)")
//   .onChange((value) => {
//     camera.rotation.y = THREE.MathUtils.degToRad(value);
//   });

// rotationFolder
//   .add(camera.rotation, "z", -180, 180, 1)
//   .name("Rot Z (°)")
//   .onChange((value) => {
//     camera.rotation.z = THREE.MathUtils.degToRad(value);
//   });
