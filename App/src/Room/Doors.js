import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Globals from '../Experience/Globals.js'

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
    const zPos = Globals((state)=> state.zPos)
    var animationDone = false
    
    // Methods
    const enterRoom = Globals((state)=> state.enterRoom)
    const startRotation = Globals((state)=> state.startRotation)
    const doorClicked = Globals((state)=> state.doorClicked)

    const exitRoomPressed = useKeyboardControls((state)=> state.escape)
    var exitUIPressed = false
    
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
        if(currentDoor != "none" && !insideRoom)
        {
            gsap.to(
                state.camera.position,
                {
                    duration: 3,
                    x: -2,
                    y: 2,
                    z: camPosZ,
                    ease: "sine",
                }
            )
            
            gsap.to(
                state.camera.rotation,
                {
                    duration: 3,
                    y: 1.5 * Math.PI,
                    ease: "sine",
                    onComplete: ()=>{startRotation(true)}
                }
            )

            // gsap.to(
            //     nodes.Puerta1.material,
            //     {
            //         duration:2,
            //         opacity: 0,
            //         ease: "sine",
            //     }
            // )

            enterRoom(true)
            document.querySelector('.point-Exit').classList.add('visible')
            document.querySelector('.point-Exit').addEventListener("click",(event)=>
            {
                document.querySelector('.point-Exit').classList.remove('visible')
                // document.querySelector('.point-Right').style.transform = `translateX(${0}px) translateY(${0}px)`
                doorClicked("none")
                exitUIPressed = true
                exitUIPressed = false
                startRotation(false)
                // animationDone = true

                gsap.to(
                    state.camera.position,
                    {
                        x: -5,
                        y: 6.5,
                        z: zPos,
                        duration:2,
                        ease: "sine",
                        onComplete: ()=>{
                            // animationDone = false
                            enterRoom(false)
                        }
                    })

                gsap.to(
                    state.camera.position,
                    {
                        x: -5,
                        y: 6.5,
                        z: zPos,
                        duration:2,
                        ease: "sine",
                        onComplete: ()=>{
                            // animationDone = false
                            enterRoom(false)
                        }
                    })

                gsap.to(
                    state.camera.rotation,
                    {
                        x: 0.5 * Math.PI,
                        y: 1.3 * Math.PI,
                        z: 0.5 * Math.PI,
                        duration:2,
                        ease: "sine",
                    })
            })
            document.querySelector('.point-Exit').style.transform = `translateX(${0}px) translateY(${300}px)`
        }
        else if(!animationDone && insideRoom && (exitRoomPressed || exitUIPressed))
        {
            // document.querySelector('.point-Exit').classList.remove('visible')
            // document.querySelector('.point-Right').style.transform = `translateX(${0}px) translateY(${0}px)`
            // exitUIPressed = false
            // startRotation(false)
            // animationDone = true

            // gsap.to(
            //     state.camera.position,
            //     {
            //         x: -5,
            //         y: 6.5,
            //         z: zPos,
            //         duration:2,
            //         ease: "sine",
            //         onComplete: ()=>{
            //             animationDone = false
            //             enterRoom(false)
            //         }
            //     })

            // gsap.to(
            //     state.camera.rotation,
            //     {
            //         x: 0.5 * Math.PI,
            //         y: 1.3 * Math.PI,
            //         z: 0.5 * Math.PI,
            //         duration:2,
            //         ease: "sine",
            //     })

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
        }
    })

    return (
        <group position={[8, 4, 10]} scale={0.1} {...props} dispose={null} >
            <mesh
                ref={door1}
                // onPointerDown={()=>{ doorClicked("door1") }}
                geometry={nodes.Puerta1.geometry}
                material={nodes.Puerta1.material}
            />
            <mesh
                ref={door2}
                // onPointerDown={()=>{ doorClicked("door2") }}
                geometry={nodes.Puerta2.geometry}
                material={nodes.Puerta2.material}
            />
            <mesh
                ref={door3}
                // onPointerDown={()=>{ doorClicked("door3") }}
                geometry={nodes.Puerta3.geometry}
                material={nodes.Puerta3.material}
            />
            <mesh
                ref={door4}
                // onPointerDown={()=>{ doorClicked("door4") }}
                geometry={nodes.Puerta4.geometry}
                material={nodes.Puerta4.material}
            />
        </group>
    )
}

useGLTF.preload("/Puertas.glb");