// src/LoadingScreen.js
import React, { useRef, useEffect } from 'react'; // Import useEffect and useRef from React
import * as THREE from 'three'; // Import THREE from the three module

const LoadingScreen = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff); // Set background to white
    mountRef.current.appendChild(renderer.domElement);

    // Create smaller red material
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000, // Bright red color
      roughness: 0.3, // Slightly less smooth
      metalness: 0.5, // Less reflective to show more color
    });

    // Add smaller spheres to the scene
    const spheres = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(0.5, 64, 64); // Smaller spheres
      const sphere = new THREE.Mesh(geometry, material);
      sphere.castShadow = true;
      sphere.position.x = i * 1.0 - 1.0; // Position spheres horizontally with less distance
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Add ambient light with increased intensity
    const ambientLight = new THREE.AmbientLight(0x404040, 4); // Stronger ambient light
    scene.add(ambientLight);

    // Add a directional light for stronger shadows and reflections
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add a point light to illuminate the spheres directly
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Set camera position closer to the spheres
    camera.position.z = 4; // Move the camera closer

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      spheres.forEach((sphere, index) => {
        const time = Date.now() * 0.002 + index;
        sphere.position.x = 1.0 * Math.sin(time); // Adjust movement scale
        sphere.position.y = 1.0 * Math.cos(time); // Adjust movement scale
        sphere.scale.setScalar(1 + 0.3 * Math.sin(time)); // Add scaling effect
      });
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array

  // Center the loader
  const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white', // White background
    zIndex: 9999,
  };

  return <div ref={mountRef} style={loaderStyle} />;
};

export default LoadingScreen;
