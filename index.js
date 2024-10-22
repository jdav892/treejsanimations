import * as THREE from "three"

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
//renders canvas
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
//where things start rendering relative to camera
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; //to move camera back a bit more

const scene = new THREE.Scene();


renderer.render(scene, camera);