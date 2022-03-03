import ReactDOM from "react-dom";
import {Canvas,useFrame} from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei'
import { useSpring, a } from "@react-spring/three"
import { useState,useRef,useEffect } from "react";
import { useMouseWheel } from 'react-use';
import { Bloom, EffectComposer } from '@react-three/postprocessing'

import "./styles.css";

const OrbitingBox = ({number,rotationAngle,props,color}) => {

  // useStates

  const [active, setActive] = useState(0);
  const [clicked, setClicked] = useState(false);

  //detect Mouse wheel movement
  const y = useMouseWheel()

  const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevy = usePrevious(y);
  
  useEffect(()=>{
    if (prevy>y) {
      setActive(active+1)
    } else if (prevy<y) {
      setActive(active-1)
    }
    setClicked(false)
  },[y])

  //create Spring
  const scrollProps = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  })

  const clickProps = useSpring({
    scale: (clicked&&((active+number)%6===0)) ? [1.4,1.4,1.4] : [1,1,1],
    config: { mass: 2, tension: 400, friction: 50, precision: 0.0001 },
  })

  //create animations
  const rotation = scrollProps.spring.to([0, 1], [number*rotationAngle, (number+1)*rotationAngle])

  //return
  return (
    <a.group rotation-y={rotation}>
      <a.mesh position={[0,0,5]} onClick={()=>setClicked(!clicked)} scale={clickProps.scale}>
        <boxBufferGeometry attach="geometry" args={[2, 1.5,0.5]} />
        <MeshWobbleMaterial attach="material" factor={0.1} speed={2} color={color}/>
      </a.mesh>
    </a.group>
  )
}

const Effects = ({meshes}) => {
  return (
    <EffectComposer>
      <Bloom selection={meshes} luminanceThreshold={0} luminanceSmoothing={0.025} intensity={0.5}/>
    </EffectComposer>
  )
}

export function Gallery() {

  const programNumber = 6
  const rotationAngle = 2*Math.PI/programNumber

  return (
    <>
      <Canvas
        camera={{position: [0,2,10], fov:50}}>
        <ambientLight intensity={0.3}/>
        <Effects />
        <pointLight position={[0,2.5,3]} intensity={1} color="yellow"/>
        <OrbitingBox
          number={0}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={1}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={2}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={3}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={4}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={5}
          rotationAngle={rotationAngle}/>
        <OrbitingBox
          number={6}
          rotationAngle={rotationAngle}/>
      </Canvas>
    </>
  );
};
