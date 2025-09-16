import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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
camera.position.z = 1;
camera.position.y = 2;

const ambientalLight = new THREE.AmbientLight(0xffffff, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);

const planeGeometry = new THREE.PlaneGeometry(4, 4);
const planeMaterial = new THREE.MeshStandardMaterial();
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;

scene.add(floor, ambientalLight, directionalLight);

const controls = new OrbitControls(camera, canva);

const renderer = new THREE.WebGLRenderer({
  canvas: canva,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);

const animation = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};

animation();
