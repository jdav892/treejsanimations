import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import makeStarfield from "./assets/src/makeStarfield.js"

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 2000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//controls shape movement with cursor
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = .03;

const loader = new THREE.TextureLoader();

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 100;
scene.add(earthGroup)
const detail = 12; 
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/textures/8k_earth_daymap.jpg")
    //map: loader.load("./assets/textures/8k_earth_nightmap.jpg")
    //map: loader.load("./assets/textures/moonmap4k.jpg")
    //map: loader.load("./assets/textures/earthmap1k.jpg")
    //map: loader.load("./assets/textures/8k_mars.jpg")
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
    //color: 0x00ff00,
    //transparent: true,
    map: loader.load("./assets/textures/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending,
})
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh)
const stars = makeStarfield({numStars: 2000});
scene.add(stars);

//adds lighting around hemisphere to discern vertices
//const hemiLight =  new THREE.HemisphereLight();
//scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)



function animate(){
    requestAnimationFrame(animate);
    //earthMesh.rotation.x += 0.001
    earthMesh.rotation.y += 0.001
    lightsMesh.rotation.y += 0.001
    renderer.render(scene, camera)
}
animate();

