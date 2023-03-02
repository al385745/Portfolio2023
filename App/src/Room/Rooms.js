import { useKeyboardControls, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Globals from '../Experience/Globals'
import gsap from "gsap"
import { CubeUVReflectionMapping, MathUtils } from 'three'
import * as THREE from 'three'

export default function Model(props) {

    const { nodes, materials } = useGLTF("/Habitaciones.glb");
    nodes.Habitacion1.material.transparent = true

    const room1 = useRef()
    const room2 = useRef()
    const room3 = useRef()
    const room4 = useRef()
    
    // Attributes
    const currentDoor = Globals((state)=> state.currentDoor)
    const insideRoom = Globals((state)=> state.insideRoom)
    const xPos = Globals((state)=> state.xPos)
    const yPos = Globals((state)=> state.yPos)
    const zPos = Globals((state)=> state.zPos)
    // Methods
    const doorClicked = Globals((state)=> state.doorClicked)
    const enterRoom = Globals((state)=> state.enterRoom)

    // const forward = useKeyboardControls((state)=> state.forward)
    // const backward = useKeyboardControls((state)=> state.forward)
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

    })

    useFrame((state)=>
    {
        cameraRef = state.camera

        // Asign a room when enter to one
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

        // Exit animation
        if(insideRoom && currentDoor == "none")
        {
            gsap.to(cameraRef.position, 
                {
                    // x: -5, y: 6.5, z: zPos,
                    x: xPos, y: yPos, z: zPos,
                    duration: 2, ease: "power2.out",
                    onComplete:()=>{
                        document.querySelector('.point-Right').classList.add('visible')
                        document.querySelector('.point-0').classList.add('visible')
                        document.querySelector('.point-1').classList.add('visible')
                        document.querySelector('.point-2').classList.add('visible')
                        document.querySelector('.point-3').classList.add('visible')
                        enterRoom(false)
                    }
                })
    
            gsap.to(
                cameraRef.rotation,
                {
                    x: 0.5 * Math.PI, y: 1.3 * Math.PI, z: 0.5 * Math.PI,
                    duration: 2, ease: "power2.out",
                })
        }
    })

    return <>
        <group {...props} dispose={null} scale={0.3} position={[10, 0, 5]}>
            <mesh
                ref={room1}
                castShadow
                receiveShadow
                geometry={nodes.Habitacion1.geometry}
                material={new THREE.MeshStandardMaterial({color: 0x00ff00})}
            />
            <mesh
                ref={room2}
                castShadow
                receiveShadow
                geometry={nodes.Habitacion2.geometry}
                material={new THREE.MeshStandardMaterial({color: 0xff0000})}
                position={[0, 0, 80]}
            />
            <mesh
                ref={room3}
                castShadow
                receiveShadow
                geometry={nodes.Habitacion3.geometry}
                material={new THREE.MeshStandardMaterial({color: 0x00ffff})}
                position={[0, 0, 160]}
            />
            <mesh
                ref={room4}
                castShadow
                receiveShadow
                geometry={nodes.Habitacion4.geometry}
                material={new THREE.MeshStandardMaterial({color: 0x0000ff})}
                position={[0, 0, 240]}
            />
        </group>
    </>
}
  
useGLTF.preload("/Habitaciones.glb");