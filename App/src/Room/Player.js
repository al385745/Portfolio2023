import { useAnimations, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import gsap from 'gsap'
import { Raycaster } from 'three'
import * as THREE from 'three'
import Globals from '../Experience/Globals'

export default function Player()
{
    const model = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(model.animations, model.scene)
    animations.actions['Survey'].play()
    var movementPlayer = "none"

    const body = useRef()
    const raycaster = new Raycaster()
    
    // Attributes
    const insideRoom = Globals((state)=> state.insideRoom)
    // Methods
    const lastZPos = Globals((state)=> state.lastZPos)
    
    const forward = useKeyboardControls((state)=> state.forward)
    const backward = useKeyboardControls((state)=> state.backward)

    const speed = 2

    useEffect(() => 
    {
        const endCharacterAnimation = ()=>
        {
            if (!forward)
            {
                animations.actions['Survey'].fadeOut(0.5)
                animations.actions['Walk'].reset().fadeIn(0.5).play()
            }
            // else if(!backward || movementPlayer == "left")
            // {
            //     animations.actions['Walk'].fadeOut(0.5)
            //     animations.actions['Survey'].reset().fadeIn(0.5).play()
            // }
        }

        return() => 
        {
            animations.actions['Survey'].fadeOut(0.5)
            animations.actions['Walk'].fadeOut(0.5)
            endCharacterAnimation()
        }
    }, [forward])

    const points =
    [
        {
            position: new THREE.Vector3(0, 0, 2),
            element: document.querySelector('.point-0')
        },
        {
            position: new THREE.Vector3(0, 0, 4),
            element: document.querySelector('.point-1')
        },
        {
            position: new THREE.Vector3(0, 0, 6),
            element: document.querySelector('.point-2')
        },
        {
            position: new THREE.Vector3(0, 0, 8),
            element: document.querySelector('.point-3')
        },
    ]


    useFrame((state, delta) =>
    {
        const pointRight = document.querySelector('.point-Rigth')
        if(state.camera != undefined)
        {
            if(pointRight != null)
            {
                pointRight.addEventListener("pointerenter", (event)=> { 
                    movementPlayer = "right"
                    animations.actions['Survey'].fadeOut(0.5)
                    animations.actions['Walk'].reset().fadeIn(0.5).play()
                })
                pointRight.addEventListener("pointerleave", (event)=> { 
                    movementPlayer = "none" 
                    animations.actions['Survey'].fadeOut(0.5)
                    animations.actions['Walk'].fadeOut(0.5)
                })    
            }
            
            for(const point of points)
            {
                const screenPosition = point.position.clone()
                screenPosition.project(state.camera)
    
                raycaster.setFromCamera(screenPosition, state.camera)
                // const intersects = raycaster.intersectObjects(objects, true)
                /*
                if(intersects.length === 0)
                    point.element.classList.add('visible')
                else
                {
                    const intersectionDistance = intersects[0].distance
                    const pointDistance = point.position.distanceTo(state.camera.position) 

                    if(intersectionDistance < pointDistance)
                        point.element.classList.remove('visible')
                    else
                        point.element.classList.add('visible')
                }
                */
    
                const translateX = screenPosition.x * window.innerWidth * 0.5
                const translateY = screenPosition.y * window.innerHeight * 0.5
                point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            }
        }

        if (!insideRoom)
        {
            // Move Character
            if (forward || movementPlayer == "right")
                model.scene.position.z += delta * speed
            // else if (backward || movementPlayer == "left")
            //     model.scene.position.z -= delta * speed
            
            const bodyPosition = body.current.position
            
            // Camera Follow Character
            const cameraPosition = new THREE.Vector3()
            cameraPosition.copy(bodyPosition)
            cameraPosition.x -= 5
            cameraPosition.y += 7.5
    
            const cameraTarget = new THREE.Vector3()
            cameraTarget.copy(bodyPosition)
            cameraTarget.y += 0.25
    
            state.camera.position.copy(cameraPosition)

            state.camera.rotation.set(
                0.5 * Math.PI,
                1.3 * Math.PI,
                0.5 * Math.PI,
            )
            lastZPos(cameraPosition.z)
            // state.camera.lookAt(cameraTarget)
        }

        if(insideRoom && pointRight != null)
        {
            pointRight.style.transform = `translateX(${600}px) translateY(${0}px)`
        }
    })
    

    return <> 
        <primitive ref={body} object={model.scene} scale={0.02} position-y={-1}/>
    </>
}
useGLTF.preload('./Fox/glTF/Fox.gltf')