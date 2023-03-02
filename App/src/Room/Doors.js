import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import Globals from '../Experience/Globals.js'
import * as THREE from 'three'
import gsap from "gsap"

export default function Doors(props) {

    const { nodes, materials } = useGLTF("/Puertas.glb");
    nodes.Puertas.material.transparent = true

    const currentDoor = Globals((state)=> state.currentDoor)
    const insideRoom = Globals((state)=> state.insideRoom)
    
    // Methods
    const enterRoom = Globals((state)=> state.enterRoom)
    const startRotation = Globals((state)=> state.startRotation)
    
    const exitRoomPressed = useKeyboardControls((state)=> state.escape)
    var exitUIPressed = false
    var animationDone = false

    const pointsDoors = [
        {   position: new THREE.Vector3(2.2, 1.5, 5),
            element: document.querySelector('.point-0')
        },
        {   position: new THREE.Vector3(2.2, 1.5, 29),
            element: document.querySelector('.point-1')
        },
        {   position: new THREE.Vector3(2.2, 2, 53),
            element: document.querySelector('.point-2')
        },
        {   position: new THREE.Vector3(2.2, 1.5, 77),
            element: document.querySelector('.point-3')
        },]
    
    document.querySelector('.point-Rotate').style.left = `${90}%`

    useFrame((state)=>
    {
        var camPosZ = 0
        switch(currentDoor)
        {
            case "door1": camPosZ = 5
                break
            case "door2": camPosZ = 29
                break
            case "door3": camPosZ = 53
                break
            case "door4": camPosZ = 77
                break
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
            document.querySelector('.point-0').classList.remove('visible')
            document.querySelector('.point-1').classList.remove('visible')
            document.querySelector('.point-2').classList.remove('visible')
            document.querySelector('.point-3').classList.remove('visible')

            document.querySelector('.point-Right').classList.remove('visible')
            document.querySelector('.point-Rotate').classList.add('visible')
            document.querySelector('.point-Exit').classList.add('visible')
            document.querySelector('.point-Exit').style.top = `${90}%`


            gsap.to(state.camera.position,
                {
                    x: 8, y: 3, z: camPosZ,
                    duration: 3, ease: "lineal",
                })
            
            gsap.to(state.camera.rotation,
                {
                    y: 1.5 * Math.PI,
                    duration: 3, ease: "lineal",
                    onComplete: ()=>{nodes.Puertas.material.opacity = 0}
                })
            
            // Hide door
            // gsap.to(nodes.Puertas.material,
            //     {
            //         duration: 2,
            //         opacity: 0,
            //         ease: "power2.in",
            //     })
        }
        else if(currentDoor == "none")
        {
            // Show doors again
            nodes.Puertas.material.opacity = 100
            // gsap.to(nodes.Puertas.material,
            //     {
            //         duration: 2,
            //         opacity: 100,
            //         ease: "power2.out",
            //     })
        }
    })

    return (
        <group {...props} dispose={null} scale={0.3} position={[10, 0, 5]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Puertas.geometry}
                material={new THREE.MeshStandardMaterial({color: 0xf3e9d0})}
                // material={materials.Material}
                position={[0, 0.02, 240]}
            />
        </group>
    )
}

useGLTF.preload("/Puertas.glb");