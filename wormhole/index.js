import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import spline from "./spline.js";


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

const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color: 0xff0000});
const line = new THREE.Line(geometry, material);
//scene.add(line);
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMat = new THREE.MeshStandardMaterial({
    color: 0x0099ff,
    side: THREE.DoubleSide,
    wireframe: true,
});

const tube = new THREE.Mesh(tubeGeo, tubeMat);
scene.add(tube);

const hemiLight =  new THREE.HemisphereLight(0xfff);
scene.add(hemiLight);

function updateCamera(t){
    const time = t * 0.05;
    const looptime = 20 * 1000;
    const p = (time % looptime) / looptime;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
    camera.position.copy(pos);
    camera.lookAt(lookAt); 
}

function animate(t = 0){
    requestAnimationFrame(animate);
    updateCamera(t);
    renderer.render(scene, camera);
    controls.update();
}
animate();

function handleWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize, false);