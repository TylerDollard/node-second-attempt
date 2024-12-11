// Setup the scene, camera, and renderer
let scene, camera, renderer;

function init() {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera with a field of view, aspect ratio, near and far clipping planes
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Set up the renderer and append it to the document body
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add ambient light
    const light = new THREE.AmbientLight(0x404040, 1);  // Soft white light
    scene.add(light);

    // Add a directional light to create shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Add cubes to the scene
    addCubes();

    // Set up the camera position
    camera.position.z = 5;

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Start the animation loop
    animate();
}

// Create cubes with different styles depending on the anime
function addCubes() {
    // Depending on the current page (anime), change the cube's appearance
    let animeStyle = document.body.classList[0] || "default";  // default is fallback if no class

    let geometry = new THREE.BoxGeometry();
    let material;

    // Choose material based on anime
    if (animeStyle === "Arcane") {
        material = new THREE.MeshBasicMaterial({ color: 0x8A2BE2, emissive: 0x9B30FF, wireframe: true }); // Arcane (Purple)
    } else if (animeStyle === "Bleach") {
        material = new THREE.MeshBasicMaterial({ color: 0xFF8C00, emissive: 0xFFD700, wireframe: false }); // Bleach (Orange)
    } else if (animeStyle === "Chainsaw man") {
        material = new THREE.MeshBasicMaterial({ color: 0xF0747E, emissive: 0xFF4C5B }); // Chainsaw Man (Red and Pink)
    } else if (animeStyle === "Demon slayer") {
        material = new THREE.MeshBasicMaterial({ color: 0xF44336, emissive: 0xE91E63 }); // Demon Slayer (Red/Green)
    } else if (animeStyle === "Jujutsu Kaisen") {
        material = new THREE.MeshBasicMaterial({ color: 0x673AB7, emissive: 0x9575CD }); // Jujutsu Kaisen (Purple)
    } else if (animeStyle === "Naruto") {
        material = new THREE.MeshBasicMaterial({ color: 0xFF7F00, emissive: 0xFF4500 }); // Naruto (Orange)
    } else if (animeStyle === "One piece") {
        material = new THREE.MeshBasicMaterial({ color: 0xF4A300, emissive: 0xFF9800 }); // One Piece (Yellow/Gold)
    } else if (animeStyle === "Blue lock") {
        material = new THREE.MeshBasicMaterial({ color: 0x1E90FF, emissive: 0x4682B4 }); // Blue Lock (Blue)
    } else {
        material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // Default White
    }

    // Create 3 cubes at the bottom of the screen
    for (let i = 0; i < 3; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = (i - 1) * 3; // Spread cubes across the X-axis
        cube.position.y = -2;  // Place cubes at the bottom of the scene
        cube.position.z = -5; // Keep the cubes further from the camera to be visible
        scene.add(cube);
    }
}

// Window resize handler to adjust the canvas size
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop to render the scene and rotate the cubes
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Rotate all cubes
    scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
        }
    });
}
// Function to handle the search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.input');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const animeLinks = document.querySelectorAll('nav ul li a');

        animeLinks.forEach(link => {
            const title = link.textContent.toLowerCase();

            if (title.includes(query)) {
                link.style.display = 'block'; // Show matching anime
            } else {
                link.style.display = 'none'; // Hide non-matching anime
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-bar');  // Get the search input field
    const animeList = document.getElementById('anime-list');  // Get the anime links container

    // Add an event listener for input events on the search bar
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();  // Get the search query and convert it to lowercase
        const animeLinks = animeList.querySelectorAll('a');  // Get all anime links

        // Loop through each anime link and hide or show based on the search query
        animeLinks.forEach(link => {
            const title = link.textContent.toLowerCase();  // Get the text content of each link
            if (title.includes(query)) {
                link.style.display = 'block';  // Show the link if it matches the query
            } else {
                link.style.display = 'none';  // Hide the link if it doesn't match the query
            }
        });
    });
});

// Start the initialization when the window is loaded
window.onload = init;
