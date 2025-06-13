import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple geometric shapes
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.8),
      new THREE.IcosahedronGeometry(1.2),
      new THREE.DodecahedronGeometry(1.3)
    ];

    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x3b82f6, wireframe: true }),
      new THREE.MeshLambertMaterial({ color: 0x8b5cf6, wireframe: true }),
      new THREE.MeshLambertMaterial({ color: 0x06b6d4, wireframe: true }),
      new THREE.MeshLambertMaterial({ color: 0xf59e0b, wireframe: true }),
      new THREE.MeshLambertMaterial({ color: 0xef4444, wireframe: true })
    ];

    const meshes = [];

    // Create meshes and position them
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      
      // Position meshes in a formation
      const angle = (index / geometries.length) * Math.PI * 2;
      const radius = 8;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle) * radius;
      mesh.position.z = Math.random() * 4 - 2;
      
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation function
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate each mesh
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.01 + index * 0.002;
        
        // Add floating animation
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
      });

      // Rotate the entire scene slowly
      scene.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-60">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block text-white">Gutti</span>
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kavya Sri
            </span>
          </h1>

          {/* Role */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
            Frontend Developer
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Crafting beautiful, interactive web experiences with modern technologies 
            and a passion for clean, efficient code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-all duration-300 animate-bounce"
      >
        <ChevronDown size={32} />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;