// Import dependencies
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Load background texture
const spaceTexture = new THREE.TextureLoader().load('images/sq.png');
scene.background = spaceTexture;

// Create a cube
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.set(-15, 0, -15);

// Create an icosahedron with Phong material
const icoGeometry = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
scene.add(icoMesh);
icoMesh.position.set(15, 0, -15);

// Add lights to the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Add helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Set up Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Slowly rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rotate the icosahedron a little faster in the opposite direction
    icoMesh.rotation.z -= 0.03;
    icoMesh.rotation.y -= 0.03;

    // Update controls
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Start the animation
animate();
