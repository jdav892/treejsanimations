import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = .03;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const hemiLight =  new THREE.HemisphereLight(0xfff);
scene.add(hemiLight);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
    cube.rotation.x += 0.001
    cube.rotation.y += 0.001
}
animate();