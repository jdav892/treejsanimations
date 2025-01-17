import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import spline from "./spline.js";


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xff0000, 0.3);
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
const material = new THREE.LineBasicMaterial({color: 0xffffff});
const line = new THREE.Line(geometry, material);
//scene.add(line);

const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMat = new THREE.MeshBasicMaterial({
    color: 0x0099ff,
    side: THREE.DoubleSide,
    wireframe: true,
});

const tube = new THREE.Mesh(tubeGeo, tubeMat);
//scene.add(tube);

const edges = new THREE.EdgesGeometry(tubeGeo, .2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xff });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

const numBoxes = 60;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size, size, size);
for (let i = 0; i < numBoxes; i++){
    const boxMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true});
    const box = new THREE.Mesh(boxGeo, boxMat);
    const p = (i / numBoxes + Math.random() * 0.1) % 1;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    pos.x += Math.random() - 0.4;
    pos.z += Math.random() - 0.4;
    box.position.copy(pos);
    const rote = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
    );
    box.rotation.set(rote.x, rote.y, rote.z);
    const edges = new THREE.EdgesGeometry(boxGeo, .2);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff });
    const boxLines = new THREE.LineSegments(edges, lineMat);
    boxLines.position.copy(pos);
    boxLines.rotation.set(rote.x, rote.y, rote.z);
    scene.add(boxLines);
    //scene.add(box);
}


function updateCamera(t){
    const time = t * 0.1;
    const looptime = 8 * 1000;
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