const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0d);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.5, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 5, 5);
scene.add(directional);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x222244 })
);
cube.position.set(-4, 0, 0);
scene.add(cube);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x6a5acd })
);
sphere.position.set(4, 0, 0);
scene.add(sphere);

const loader = new THREE.GLTFLoader();
const modelUrl = "https://raw.githubusercontent.com/rakhikmar/sem2kt3/main/chain.glb";

let model;

loader.load(
    modelUrl,
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, 0, 0);
        scene.add(model);
    }
);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    sphere.rotation.y += 0.01;

    if (model) {
        model.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
