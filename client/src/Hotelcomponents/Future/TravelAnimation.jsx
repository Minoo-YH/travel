﻿import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styled from "styled-components";

const FutureTripWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

function TravelAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    const loader = new GLTFLoader();
    let airplane, mixer;

    loader.load(
      "/assets/images/cartoon_plane.glb",
      (gltf) => {
        airplane = gltf.scene;
        airplane.scale.set(1.5, 1.5, 1.5);
        scene.add(airplane);
        camera.position.set(0, 5, 20);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(airplane);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // ðŸŽ¯ Ù…Ù†Ø­Ù†Ù‰ Ø¨ÙŠØ²ÙŠÙ‡ Ù„Ø­Ø±ÙƒØ© Ø§Ù„Ø·Ø§Ø¦Ø±Ø©
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 3, 5),  // ðŸŸ¢ Ù†Ù‚Ø·Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ© (x-, y+)
      new THREE.Vector3(-2, -1, 3), // ðŸ”½ Ø§Ù„Ù†Ø²ÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ù…Ù†ØªØµÙ
      new THREE.Vector3(2, 5, 0),   // ðŸ”¼ Ø§Ù„ØµØ¹ÙˆØ¯ Ø¥Ù„Ù‰ Ø§Ù„ÙŠØ³Ø§Ø±
      new THREE.Vector3(-5, 3, 5)   // ðŸ”„ Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø¨Ø¯Ø§ÙŠØ© Ù„Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„Ø­Ù„Ù‚Ø©
    ], true); // âš ï¸ "true" ØªØ¹Ù†ÙŠ Ø£Ù† Ø§Ù„Ù…Ø³Ø§Ø± Ù…ØºÙ„Ù‚ ÙˆÙŠÙƒØ±Ø± Ù†ÙØ³Ù‡ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹

    const clock = new THREE.Clock();
    let t = 0; 
    let speed = 0.002; // Ø³Ø±Ø¹Ø© Ø§Ù„Ø­Ø±ÙƒØ©

    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());

      if (airplane) {
        t += speed; 
        if (t >= 1) t = 0; // ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø© `t` Ø¥Ù„Ù‰ `0` Ù„Ø¬Ø¹Ù„ Ø§Ù„Ø­Ø±ÙƒØ© ØªØªÙƒØ±Ø±

        const position = curve.getPoint(t); // ðŸ“ ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ø­Ø§Ù„ÙŠ
        airplane.position.copy(position);

        const tangent = curve.getTangent(t).normalize(); // ðŸ“ Ø­Ø³Ø§Ø¨ Ø§Ù„Ø§ØªØ¬Ø§Ù‡
        const lookAtPosition = position.clone().add(tangent); 
        airplane.lookAt(lookAtPosition);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <FutureTripWrapper ref={containerRef} />;
}

export default TravelAnimation;



