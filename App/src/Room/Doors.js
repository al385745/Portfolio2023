import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Globals from '../Experience/Globals.js'
import * as THREE from 'three'
import gsap from "gsap"

export default function Doors(props) {

    const { nodes, materials } = useGLTF("/Puertas.glb");
    nodes.Puerta1.material.transparent = true

    const door1 = useRef();
    const door2 = useRef();
    const door3 = useRef();
    const door4 = useRef();

    const currentDoor = Globals((state)=> state.currentDoor)
    const insideRoom = Globals((state)=> state.insideRoom)
    
    // Methods
    const enterRoom = Globals((state)=> state.enterRoom)
    const startRotation = Globals((state)=> state.startRotation)
    
    const exitRoomPressed = useKeyboardControls((state)=> state.escape)
    var exitUIPressed = false
    var animationDone = false

    const pointsDoors = [
        {   position: new THREE.Vector3(4, 1, 10),
            element: document.querySelector('.point-0')
        },
        {   position: new THREE.Vector3(4, 1, 37),
            element: document.querySelector('.point-1')
        },
        {   position: new THREE.Vector3(4, 1, 64),
            element: document.querySelector('.point-2')
        },
        {   position: new THREE.Vector3(4, 1, 91),
            element: document.querySelector('.point-3')
        },]
    
    document.querySelector('.point-Rotate').style.left = `${90}%`

    useFrame((state)=>
    {
        var camPosZ = 0
        switch(currentDoor)
        {
            case "door1": camPosZ = 10
                break
            case "door2": camPosZ = 37
                break
            case "door3": camPosZ = 64
                break
            case "door4": camPosZ = 91
                break
            // default: doorClicked("none")
            //     break
        }

        // Move points to the 3D environment
        for(const point of pointsDoors)
        {
            const screenPosition = point.position.clone()
            screenPosition.project(state.camera)
    
            const translateX = screenPosition.x * window.innerWidth * 0.5
            const translateY = -screenPosition.y * window.innerHeight * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }

        if(currentDoor != "none" && !insideRoom)
        {
            enterRoom(true)
            document.querySelector('.point-Right').classList.remove('visible')
            document.querySelector('.point-Rotate').classList.add('visible')
            document.querySelector('.point-Exit').classList.add('visible')
            document.querySelector('.point-Exit').style.top = `${90}%`

            gsap.to(state.camera.position,
                {
                    x: -2, y: 2, z: camPosZ,
                    duration: 3, ease: "power2.out",
                })
            
            gsap.to(state.camera.rotation,
                {
                    y: 1.5 * Math.PI,
                    duration: 3, ease: "power2.out",
                    onComplete: ()=>{startRotation(true)}
                })
            
            // Hide door
            // gsap.to(
            //     nodes.Puerta1.material,
            //     {
            //         duration:2,
            //         opacity: 0,
            //         ease: "sine",
            //     }
            // )
        }
        // else if(!animationDone && insideRoom && (exitRoomPressed || exitUIPressed))
        // {
            // document.querySelector('.point-Exit').classList.remove('visible')
            // exitUIPressed = false
            // startRotation(false)
            // animationDone = true

            // Show doors again
            // gsap.to(
            //     nodes.Puerta1.material,
            //     {
            //         duration:2,
            //         opacity: 100,
            //         ease: "sine",
            //     },
            //     0
            // )
        // }
    })

    return (
        <group position={[8, 4, 10]} scale={0.1} {...props} dispose={null} >
            <mesh
                ref={door1}
                geometry={nodes.Puerta1.geometry}
                material={nodes.Puerta1.material}
            />
            <mesh
                ref={door2}
                geometry={nodes.Puerta2.geometry}
                material={nodes.Puerta2.material}
            />
            <mesh
                ref={door3}
                geometry={nodes.Puerta3.geometry}
                material={nodes.Puerta3.material}
            />
            <mesh
                ref={door4}
                geometry={nodes.Puerta4.geometry}
                material={nodes.Puerta4.material}
            />
        </group>
    )
}

useGLTF.preload("/Puertas.glb");