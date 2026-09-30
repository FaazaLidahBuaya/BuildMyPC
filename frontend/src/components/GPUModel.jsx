import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function GPUModel() {
  const { scene } = useGLTF('/gpu.glb');
  const group = useRef();

  // Paksa model ke titik tengah 0,0,0 dengan menghitung bounding box
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.set(-center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Rotasi otomatis
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={group} scale={0.2} rotation={[0.35, 0.5, -0.15]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/gpu.glb');
