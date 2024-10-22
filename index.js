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


const geo = new THREE.IcosahedronGeometry(1.0, 2); //primitves in Threejs library
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
//creates wireframe around object
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
//adds wiremesh to child of mesh
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
//to change lighting of object
scene.add(hemiLight);

function animate(t = 0){
//animates object
    requestAnimationFrame(animate);
//rotation over y axis with speed modifier
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
}

animate();