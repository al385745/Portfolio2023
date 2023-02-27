import { useGLTF } from '@react-three/drei'
import { useRef } from 'react';
import * as THREE from 'three'
import gsap from "gsap"

export default function Doors(props) {

    const { nodes, materials } = useGLTF("/Puertas.glb");

    const Puerta1 = useRef();
    const Puerta2 = useRef();
    const Puerta3 = useRef();
    const Puerta4 = useRef();
    const tl = useRef();

    // const [ subscribedKeys, getKeys ] = useKeyboardControls()

    const EaseCamera=(state)=>
    {
        tl.current = gsap.timeline();

        tl.current.to(
            state.camera.position,
            {
                duration: 3,
                x: -2,
                y: 2,
                z: 10,
            },
            0
        )
        tl.current.to(
            state.camera.rotation,
            {
                duration: 3,
                y: 1.5 * Math.PI,
            },
            0
        )
    }

    const RotateDoor=()=>
    {
    
        if(tl.isActive) { return }
        const animation = tl.current.to(
            Puerta1.current.rotation,
            {
                duration: 1,
                y: Puerta1.current.rotation.y *= Math.PI/4,
            },0)
    }

    return <>
        <group position={[8, 4, 10]} scale={0.1} {...props} dispose={null}>
            <mesh
                ref={Puerta1}
                onPointerOver={EaseCamera}
                onClick={RotateDoor}
                geometry={nodes.Puerta1.geometry}
                material={nodes.Puerta1.material}
            />
            <mesh
                ref={Puerta2}
                geometry={nodes.Puerta2.geometry}
                material={nodes.Puerta2.material}
            />
            <mesh
                ref={Puerta3}
                geometry={nodes.Puerta3.geometry}
                material={nodes.Puerta3.material}
            />
            <mesh
                ref={Puerta4}
                geometry={nodes.Puerta4.geometry}
                material={nodes.Puerta4.material}
            />
        </group>
    </>
}

useGLTF.preload("/Puertas.glb");