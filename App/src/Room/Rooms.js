import { useKeyboardControls, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Globals from '../Experience/Globals'
import gsap from "gsap"
import { CubeUVReflectionMapping, MathUtils } from 'three'
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
    const insideRoom = Globals((state)=> state.insideRoom)
    const enabledRoomRotation = Globals((state)=> state.enabledRoomRotation)
    var canRotate = false
    const zPos = Globals((state)=> state.zPos)
    // Methods
    const doorClicked = Globals((state)=> state.doorClicked)
    const startRotation = Globals((state)=> state.startRotation)
    const enterRoom = Globals((state)=> state.enterRoom)

    const forward = useKeyboardControls((state)=> state.forward)
    const backward = useKeyboardControls((state)=> state.forward)
    var roomToRotate = null
    var animationDone = false
    var cameraRef = null

    document.querySelector('.point-Rotate').addEventListener("click",(event)=>
    {
        if(!animationDone && insideRoom && roomToRotate != null)
        {
            animationDone = true
            gsap.to(roomToRotate.rotation,
                {   
                    duration: 3,
                    y: roomToRotate.rotation.y + MathUtils.degToRad(90),
                    ease: "sine",
                    onComplete: ()=>{ 
                        animationDone = false
                    }
                })
        }
    })

    document.querySelector('.point-Exit').addEventListener("click",(event)=>
    {
        document.querySelector('.point-Exit').classList.remove('visible')
        document.querySelector('.point-Rotate').classList.remove('visible')
        doorClicked("none")

        // startRotation(false)
        // exitUIPressed = true

        if(cameraRef != null)
        {
            gsap.to(cameraRef.position, 
                {
                    x: -5, y: 6.5, z: zPos,
                    duration:2, ease: "sine",
                    onComplete:()=>{
                        document.querySelector('.point-Right').classList.add('visible')
                        enterRoom(false)
                    }
                })
    
            gsap.to(cameraRef.position,
                {
                    x: -5, y: 6.5, z: zPos,
                    duration:2, ease: "sine",
                })
    
            gsap.to(
                cameraRef.rotation,
                {
                    x: 0.5 * Math.PI, y: 1.3 * Math.PI, z: 0.5 * Math.PI,
                    duration: 2, ease: "sine",
                })
        }
    })

    useFrame((state)=>
    {
        cameraRef = state.camera

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
            default: roomToRotate = null
                break
        }
    })

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