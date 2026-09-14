import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Spiderman3DProps {
  className?: string;
  onWebShoot?: () => void;
}

export const Spiderman3D: React.FC<Spiderman3DProps> = ({ className = '', onWebShoot }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup (Cinematic Red & Blue Dual Tone)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const redSpotLight = new THREE.SpotLight(0xff2a85, 6);
    redSpotLight.position.set(5, 5, 5);
    redSpotLight.angle = Math.PI / 4;
    redSpotLight.penumbra = 0.8;
    scene.add(redSpotLight);

    const blueSpotLight = new THREE.SpotLight(0x00e5ff, 5);
    blueSpotLight.position.set(-5, -3, 4);
    blueSpotLight.angle = Math.PI / 4;
    blueSpotLight.penumbra = 0.8;
    scene.add(blueSpotLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(0, 4, 6);
    scene.add(keyLight);

    // 5. 3D Spider-Man Model Group Construction
    const spidermanGroup = new THREE.Group();
    scene.add(spidermanGroup);

    // --- A. 3D Head Mesh (Pink Suit) ---
    const headGeometry = new THREE.SphereGeometry(1.3, 64, 64);
    // Slightly taper jawline for Spider-Man head shape
    const pos = headGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i);
      let z = pos.getZ(i);
      let x = pos.getX(i);

      if (y < 0) {
        // Narrow jaw
        pos.setX(i, x * (1 + y * 0.15));
        pos.setZ(i, z * (1 + y * 0.1));
      }
    }
    headGeometry.computeVertexNormals();

    const suitMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff2a85,
      roughness: 0.35,
      metalness: 0.2,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1
    });

    const headMesh = new THREE.Mesh(headGeometry, suitMaterial);
    spidermanGroup.add(headMesh);

    // --- B. 3D Spider-Man Eyes (Glowing White with Black Border) ---
    const eyeShapeLeft = new THREE.Shape();
    eyeShapeLeft.moveTo(0.15, 0.45);
    eyeShapeLeft.quadraticCurveTo(0.65, 0.3, 0.75, -0.15);
    eyeShapeLeft.quadraticCurveTo(0.35, -0.2, 0.15, 0.45);

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };

    const eyeGeomLeft = new THREE.ExtrudeGeometry(eyeShapeLeft, extrudeSettings);
    
    // Left Eye Black Border
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.8 });
    const eyeBorderLeft = new THREE.Mesh(eyeGeomLeft, borderMat);
    eyeBorderLeft.position.set(0.12, 0.15, 1.18);
    eyeBorderLeft.rotation.set(-0.1, 0.25, -0.15);
    spidermanGroup.add(eyeBorderLeft);

    // Left Eye White Glowing Center
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeCenterGeom = new THREE.ExtrudeGeometry(eyeShapeLeft, { ...extrudeSettings, depth: 0.06 });
    const eyeCenterLeft = new THREE.Mesh(eyeCenterGeom, eyeWhiteMat);
    eyeCenterLeft.scale.set(0.85, 0.85, 1);
    eyeCenterLeft.position.set(0.16, 0.18, 1.19);
    eyeCenterLeft.rotation.set(-0.1, 0.25, -0.15);
    spidermanGroup.add(eyeCenterLeft);

    // Right Eye Mirroring
    const eyeBorderRight = eyeBorderLeft.clone();
    eyeBorderRight.position.set(-0.58, 0.15, 1.18);
    eyeBorderRight.rotation.set(-0.1, -0.25, 0.15);
    eyeBorderRight.scale.set(-1, 1, 1);
    spidermanGroup.add(eyeBorderRight);

    const eyeCenterRight = eyeCenterLeft.clone();
    eyeCenterRight.position.set(-0.58, 0.18, 1.19);
    eyeCenterRight.rotation.set(-0.1, -0.25, 0.15);
    eyeCenterRight.scale.set(-1, 1, 1);
    spidermanGroup.add(eyeCenterRight);

    // --- C. 3D Web Lines Overlay (Grooves on Head) ---
    const webLinesGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
      const lineGeom = new THREE.BufferGeometry();
      const points = [];
      for (let t = 0; t <= 1; t += 0.05) {
        const radius = 1.32;
        const x = Math.sin(t * Math.PI) * Math.cos(angle) * radius;
        const y = Math.cos(t * Math.PI) * radius;
        const z = Math.sin(t * Math.PI) * Math.sin(angle) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }
      lineGeom.setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMat);
      webLinesGroup.add(line);
    }
    spidermanGroup.add(webLinesGroup);

    // --- D. 3D Spider Chest Logo / Emblem underneath ---
    const logoShape = new THREE.Shape();
    logoShape.moveTo(0, 0.2);
    logoShape.lineTo(0.12, -0.1);
    logoShape.lineTo(0, -0.35);
    logoShape.lineTo(-0.12, -0.1);
    logoShape.closePath();

    const logoGeom = new THREE.ExtrudeGeometry(logoShape, { depth: 0.04, bevelEnabled: false });
    const logoMat = new THREE.MeshBasicMaterial({ color: 0x050608 });
    const chestLogo = new THREE.Mesh(logoGeom, logoMat);
    chestLogo.position.set(0, -1.2, 1.05);
    spidermanGroup.add(chestLogo);

    // --- E. 3D Outer Spider Web Orbit Rings & Sparkles ---
    const ringGeom1 = new THREE.TorusGeometry(2.2, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xe50914, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    spidermanGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(2.6, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x0055ff, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    spidermanGroup.add(ring2);

    // Floating 3D Web Particles
    const particlesCount = 80;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffcc00, transparent: true, opacity: 0.8 });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    setIsLoaded(true);

    // 6. Interactive Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / windowHalfX;
      mouseY = (e.clientY - windowHalfY) / windowHalfY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous floating & subtle 3D breathing
      spidermanGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      
      // Smooth lerp mouse rotation
      targetX = mouseX * 0.45;
      targetY = mouseY * 0.35;

      spidermanGroup.rotation.y += (targetX - spidermanGroup.rotation.y) * 0.05;
      spidermanGroup.rotation.x += (targetY - spidermanGroup.rotation.x) * 0.05;

      // Orbit rings rotation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.4;
      particleSystem.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-72 h-72 sm:w-96 sm:h-96 cursor-pointer touch-none z-10" 
        onClick={onWebShoot}
        title="Interactive 3D Spider-Man (Move mouse to interact, click for web shoot!)"
      />

      {/* 3D Glow Aura Behind Model */}
      <div className="absolute inset-0 bg-spider-red/20 rounded-full blur-3xl pointer-events-none animate-pulse scale-90" />

      {/* Interactive Helper Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-spider-red text-spider-accent font-comic text-xs tracking-wider uppercase shadow-comic pointer-events-none"
      >
        <span>🕷️ 3D SPIDER-MAN MODEL (MOVE MOUSE & TOUCH)</span>
      </motion.div>
    </div>
  );
};
