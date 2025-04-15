import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

const RotatingCube = () => {
  const meshRef = useRef();
  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#468585"} />
    </mesh>
  );
}
const App = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <OrbitControls enablePan enableZoom enableRotate />

      <directionalLight position={[1, 1, 1]} intensity={10} color={0x3f4f3f}/>
      <color attach={'background'} args={[0x3f4f3f]} />


      <ambientLight intensity={0.5} />  
      <RotatingCube />
    </Canvas>
  );
}

export default App;