// The main page of this website

import { Canvas,useFrame } from "@react-three/fiber";
import React, { useRef,useState,useCallback } from "react";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { Resizer, KernelSize } from "postprocessing";
import { useSpring, a } from '@react-spring/three'
import {useNavigate} from 'react-router-dom';

const phiArray = Array.from({length: 10}, () => Math.random()*2*Math.PI)
const ampArray = Array.from({length: 10}, () => Math.random()*0.7)
const mulArray = Array.from({length: 10}, () => 0.2 + Math.random()*0.5)

const Bloom = ({selection,lights}) => {
  return (
    <EffectComposer>
      <SelectiveBloom
        lights={lights} // ⚠️ REQUIRED! all relevant lights
        selection={selection} // selection of objects that will have bloom effect
        selectionLayer={10} // selection layer
        intensity={1.0} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        width={Resizer.AUTO_SIZE} // render width
        height={Resizer.AUTO_SIZE} // render height
        kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
      />
    </EffectComposer>
  )
}




const LightSphere = ({realref,position,phi,amp,mul,lights,site,changecolor}) => {

  const sphere = useRef()

  const { color } = useSpring({
    color:  lights? "cyan" : changecolor,
  });

  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    sphere.current.rotation.y = a*mul
    sphere.current.position.y = position[1] + Math.sin(a+phi)*amp
  })

  
  return (
    <group ref={sphere}>
      <mesh ref={realref} position={position} onClick={!lights?site:null}>
        <a.meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
        <a.sphereBufferGeometry args={[1,32,32]}/>
      </mesh>
    </group>
  )
}

const DarkSphere = ({realref,position,phi,amp,mul}) => {

  const sphere = useRef()

  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    sphere.current.rotation.y = a*mul
    sphere.current.position.y = position[1] + Math.sin(a+phi)*amp
  })
  
  return (
    <a.group ref={sphere}>
      <a.mesh ref={realref} position={position}>
        {/* <MeshDistortMaterial castShadow receiveShadow attach="material" speed={2.1} distort={0.3} color={color} roughness={0} metalness={0.1} /> */}
        <meshStandardMaterial attach="material" color="cyan" roughness={0} metalness={0.1} />
        <sphereBufferGeometry args={[1,32,32]}/>
      </a.mesh>
    </a.group>
  )
}

export default function Mainpage() {

  const navigate = useNavigate();
  const projectsClick = useCallback(() => navigate('/projects', {replace: true}), [navigate]);
  const site1Click = useCallback(() => navigate('/site1', {replace: true}), [navigate]);
  const site2Click = useCallback(() => navigate('/site2', {replace: true}), [navigate]);
  const site3Click = useCallback(() => navigate('/site3', {replace: true}), [navigate]);
  const site4Click = useCallback(() => navigate('/site4', {replace: true}), [navigate]);


  const d1 = useRef()
  const d2 = useRef()
  const d3 = useRef()
  const d4 = useRef()
  const d5 = useRef()
  const d6 = useRef()
  const d7 = useRef()
  const d8 = useRef()
  const d9 = useRef()
  const d10 = useRef()

  const lightRef = useRef()
  const lightRef2 = useRef()
  const [lights,setLights] = useState(true)

  return (
    <div className="main" style={{ backgroundColor: lights ? "white" : "#191919", transition: "all .5s ease"}}>
      <Canvas colorManagement camera={{ position: [-20, 10, 0], fov: 50 }}>
        <ambientLight intensity={0.5} color="white" />
        <directionalLight
          position={[2.5, 8, 5]}
          intensity={1}
          color="white"
        />
        <pointLight 
          position={[0,0,-0]}
          intensity={3}
          color="yellow"
        />
        {lights? null:<Bloom selection={[d1,d2,d3,d4,d5]} lights={[lightRef,lightRef2]} />}
        <group>
          <DarkSphere realref={d1} position={[2.65,1.59,0.85]} phi={phiArray[0]} amp={ampArray[0]} mul={mulArray[0]}/>
          <DarkSphere realref={d2} position={[7.2,-0.81,-4.74]} phi={phiArray[1]} amp={ampArray[1]} mul={mulArray[1]}/>
          <DarkSphere realref={d3} position={[-3.88,-2.31,0.22]} phi={phiArray[2]} amp={ampArray[2]} mul={mulArray[2]}/>
          <DarkSphere realref={d4} position={[2.51,-0.3,-1.72]} phi={phiArray[3]} amp={ampArray[3]} mul={mulArray[3]}/>
          <DarkSphere realref={d5} position={[-1.55,1.33,3.1]} phi={phiArray[4]} amp={ampArray[4]} mul={mulArray[4]}/>

          <LightSphere realref={d6} position={[-1,1.5,4.9]} phi={phiArray[5]} amp={ampArray[5]} mul={mulArray[5]} lights={lights} site={projectsClick} changecolor="#Ffcb00"/>
          <LightSphere realref={d7} position={[0,-1.6,0.74]} phi={phiArray[6]} amp={ampArray[6]} mul={mulArray[6]} lights={lights} site={site1Click} changecolor="#58FF00"/>
          <LightSphere realref={d8} position={[-1.7,3.5,-2.48]} phi={phiArray[7]} amp={ampArray[7]} mul={mulArray[7]} lights={lights} site={site2Click} changecolor="#00FF76"/>
          <LightSphere realref={d9} position={[-1.14,-3.36,-4.89]} phi={phiArray[8]} amp={ampArray[8]} mul={mulArray[8]} lights={lights} site={site3Click} changecolor="#FF1C00"/>
          <LightSphere realref={d10} position={[4.67,3.86,-1.46]} phi={phiArray[9]} amp={ampArray[9]} mul={mulArray[9]} lights={lights} site={site4Click} changecolor="#FF009F"/>
        </group>
      </Canvas>
      <div className="logo" onClick={()=>(setLights(!lights))}>
        Candela Lighting Lab
      </div>
      {/* <div className="text" onClick={()=>(setLights(!lights))} style={{color:!lights ? "white" : "#191919", transition: "all .5s ease"}}>
        {lights?"Let There Be Light":"We Make it Stand Out"}
      </div> */}
    </div>
  )
}
