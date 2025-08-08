import React, { useEffect, useRef } from "react";
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

    // 🎯 منحنى بيزيه لحركة الطائرة
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 3, 5),  // 🟢 نقطة البداية (x-, y+)
      new THREE.Vector3(-2, -1, 3), // 🔽 النزول إلى المنتصف
      new THREE.Vector3(2, 5, 0),   // 🔼 الصعود إلى اليسار
      new THREE.Vector3(-5, 3, 5)   // 🔄 العودة للبداية لإكمال الحلقة
    ], true); // ⚠️ "true" تعني أن المسار مغلق ويكرر نفسه تلقائياً

    const clock = new THREE.Clock();
    let t = 0; 
    let speed = 0.002; // سرعة الحركة

    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());

      if (airplane) {
        t += speed; 
        if (t >= 1) t = 0; // 🔄 إعادة `t` إلى `0` لجعل الحركة تتكرر

        const position = curve.getPoint(t); // 📍 تحديد الموقع الحالي
        airplane.position.copy(position);

        const tangent = curve.getTangent(t).normalize(); // 📏 حساب الاتجاه
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
