// Yellow Sphere
import { Canvas,useFrame } from "@react-three/fiber";
import React, { useRef,useState,useCallback } from "react";
import { EffectComposer,Bloom } from "@react-three/postprocessing";
import { useSpring, a } from '@react-spring/three'
import {useNavigate} from 'react-router-dom';
import { Resizer, KernelSize } from "postprocessing";
import { OrthographicCamera } from '@react-three/drei'


const Sphere = ({site}) => {



  //floating animation
  const sphere = useRef()
  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    sphere.current.position.y = Math.sin(a)
  })
  
  
  return (
  <mesh ref={sphere} onClick={site} position={[0,0,0]}>
    <a.meshStandardMaterial attach="material" color="#58FF00" roughness={0} metalness={0.1} />
    <a.sphereBufferGeometry args={[1,32,32]}/>
  </mesh>
  )
  }

export default function Site1() {

  //circumvent Link
  const navigate = useNavigate();
  const mainClick = useCallback(() => navigate('/', {replace: true}), [navigate]);

  return(
    <div className="main" style={{backgroundColor:"#191919"}}>
      <div className="othermain" style={{backgroundColor:"#191919"}}>
        <Canvas colorManagement camera={{ position: [-18, 5, -4], fov: 50 }}>
          <EffectComposer>
            <Bloom 
              intensity={1.0} // The bloom intensity.
              blurPass={undefined} // A blur pass.
              width={Resizer.AUTO_SIZE} // render width
              height={Resizer.AUTO_SIZE} // render height
              kernelSize={KernelSize.LARGE} // blur kernel size
              luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.025}  />
          </EffectComposer>
          <ambientLight intensity={0.5} color="white" />
          <directionalLight
            position={[4.5, 3, 1]}
            intensity={1}
            color="white"
          />
          <pointLight 
            position={[2,-5,-4]}
            intensity={3}
            color="yellow"
          />
          <Sphere site={mainClick}/>
        </Canvas>
      </div>
    </div>
  )
}