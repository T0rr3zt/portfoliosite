const canvas = document.getElementById('particle-trail'); 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000); 
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particleCount = 1000; 
const particles = new THREE.BufferGeometry(); 
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array (particleCount * 3); 

for (let i = 0; i < particleCount; i++){
  positions[i * 3] = Math.random() * 2 - 1;
  positions[i * 3 + 1] = Math.random() * 2 - 1;
  positions[i * 3 + 2] = Math.random() * 2 - 1; 

  velocities[i * 3] = Math.random() * 0.02 - 0.01;
  velocities[i * 3 + 1] = Math.random() * 0.02 - 0.01; 
  velocities[i * 3 + 2] = Math.random() * 0.02 - 0.01;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3)); 

const particleMaterial = new THREE.PointsMaterial({
  color: 0x64ffda, 
  size: 0.05,
  transparent: true,
});


const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add (particleSystem); 

const mouse = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1; 
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}); 

function animate () { 
  const positions = particles.attributes.position.array;
  const velocities = particles.attributes.velocity.array;

  for (let i = 0; i < particleCount; i++){
    positions[i * 3] += velocities[i * 3] + (mouse.x - positions[i * 3]) * 0.01;
    positions[i * 3 + 1] += velocities[i * 3 + 1] + (mouse.y - positions[i * 3 + 1]) * 0.01; 
    positions[i * 3 + 2] += velocities[i * 3 + 2];
  
    if (positions[i * 3] > 1 || positions[i * 3 + 1] < -1) positions[i * 3] = Math.random() * 2 - 1;
    if (positions[i * 3 + 1] > 1 || positions[i * 3 + 1] < -1) positions[i * 3 + 1] = Math.random() * 2 - 1;
    if (positions[i * 3 + 2] > 1 || positions[i * 3 + 2] < -1) positions [i * 3 + 2] = Math.random() * 2 - 1;
  }  

  particles.attributes.position.needsUpdate = true; 
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
});

animate (); 


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
