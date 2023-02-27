import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from "gsap"

export default function Doors(props) {

    const { nodes, materials } = useGLTF("/Puertas.glb");

    const Puerta1 = useRef();
    const Puerta2 = useRef();
    const Puerta3 = useRef();
    const Puerta4 = useRef();

    var cameraAnimDone = false
    var startRoomRotation = false

    const [ subscribedKeys, getKeys ] = useKeyboardControls()

    const CameraPathAnimation=(state)=>
    {
        const tl = gsap.timeline();
        if(!cameraAnimDone)
        {
            const animPos = tl.to(
                state.camera.position,
                {
                    duration: 3,
                    x: -2,
                    y: 2,
                    z: 10,
                    ease: "sine",
                },
                0)
            
            const animRot = tl.to(
                state.camera.rotation,
                {
                    duration: 3,
                    y: 1.5 * Math.PI,
                    ease: "sine",
                    onComplete: ()=> {startRoomRotation = true}

                },
                0
            )
            cameraAnimDone = true
        } 
    }

    useEffect(()=>
    {
        subscribedKeys(
            (state) =>
            {
              if(state.forward && cameraAnimDone)
                RotateRoom(true)
              else if(state.backward && cameraAnimDone)
                RotateRoom(false)
            } 
        )
    },[])

    const RotateRoom = (forward)=>
    {
        const tlRoom = gsap.timeline();
        var direction = -1
        if (forward)
            direction = 1

        if(startRoomRotation)
        {
            tlRoom.to(
                Puerta1.current.rotation,
                {   
                    duration: 2,
                    y: Puerta1.current.rotation.y + Math.PI/2 * direction,
                    ease: "sine",
                    onComplete: ()=>{startRoomRotation=true}
                },
                0)
            startRoomRotation = false
        }
    }
    
    return <>
        <group position={[8, 4, 10]} scale={0.1} {...props} dispose={null}>
            <mesh
                ref={Puerta1}
                onClick={CameraPathAnimation}
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