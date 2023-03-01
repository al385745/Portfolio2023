import { useKeyboardControls, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import Globals from '../Experience/Globals'
import gsap from "gsap"
import * as THREE from 'three'

export default function Model(props) {

    const { nodes, materials } = useGLTF("/Habitaciones.glb");
    // nodes.Habitacion1.material.transparent = true

    const room1 = useRef()
    const room2 = useRef()
    const room3 = useRef()
    const room4 = useRef()
    
    // Attributes
    const currentDoor = Globals((state)=> state.currentDoor)
    const enabledRoomRotation = Globals((state)=> state.enabledRoomRotation)
    var roomToRotate = null
    // Methods
    const startRotation = Globals((state)=> state.startRotation)
    
    const forward = useKeyboardControls((state)=> state.forward)
    const backward = useKeyboardControls((state)=> state.forward)

    useEffect(()=>
    {
        var direction = -1
        if (forward)
            direction = 1

        switch(currentDoor)
        {
            case "door1": roomToRotate = room1.current
                break
            case "door2": roomToRotate = room2.current
                break
            case "door3": roomToRotate = room3.current
                break
            case "door4": roomToRotate = room4.current
                break
        }

        if(enabledRoomRotation && (forward || backward))
        {
            gsap.to(
                roomToRotate.rotation,
                {   
                    duration: 2,
                    y: roomToRotate.rotation.y + Math.PI/2 * direction,
                    ease: "sine",
                    onComplete: ()=>{startRotation(true)}
                }
            )
            startRotation(false)
        }
    },[forward, backward])

    return (
        <group {...props} /*side={THREE.BackSide}*/ position={[10.6, 2.4, 10]}scale={0.1} dispose={null}>
                <mesh
                    ref={room1}
                    geometry={nodes.Habitacion1.geometry}
                    material={materials["Material.001"]}
                    position={[0, 0, 0]}
                />
                <mesh
                    ref={room2}
                    geometry={nodes.Habitacion2.geometry}
                    material={materials["Material.002"]}
                    position={[0, 0, 270]}
                />
                <mesh
                    ref={room3}
                    geometry={nodes.Habitacion3.geometry}
                    material={materials["Material.003"]}
                    position={[0, 0, 540]}
                />
                <mesh
                    ref={room4}
                    geometry={nodes.Habitacion4.geometry}
                    material={materials["Material.004"]}
                    position={[0, 0, 810]}
                />
        </group>
    )
}
  
useGLTF.preload("/Habitaciones.glb");