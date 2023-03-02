import { useAnimations, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import Globals from '../Experience/Globals'

export default function Player()
{
    const model = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(model.animations, model.scene)
    animations.actions['Survey'].play()
    var movementPlayer = "none"
    const body = useRef()
    const speed = 2
    
    // Attributes
    const insideRoom = Globals((state)=> state.insideRoom)
    // Methods
    const lastXPos = Globals((state)=> state.lastXPos)
    const lastYPos = Globals((state)=> state.lastYPos)
    const lastZPos = Globals((state)=> state.lastZPos)
    
    const forward = useKeyboardControls((state)=> state.forward)
    // const backward = useKeyboardControls((state)=> state.backward)

    const pointRight = document.querySelector('.point-Right')
    pointRight.style.left = `${90}%`
    pointRight.addEventListener("pointerenter", (event)=> { 
        if(!insideRoom)
        {
            movementPlayer = "right"
            animations.actions['Survey'].fadeOut(0.5)
            animations.actions['Walk'].reset().fadeIn(0.5).play()
        }
    })
    pointRight.addEventListener("pointerleave", (event)=> { 
        if(!insideRoom)
        {
            movementPlayer = "none" 
            animations.actions['Walk'].fadeOut(0.5)
            animations.actions['Survey'].reset().fadeIn(0.5).play()
        }
    })   

    // For keyboard onlye
    useEffect(() => 
    {
        const endCharacterAnimation = ()=>
        {
            if (!forward)
            {
                animations.actions['Survey'].fadeOut(0.5)
                animations.actions['Walk'].reset().fadeIn(0.5).play()
            }
            else
            {
                animations.actions['Walk'].fadeOut(0.5)
                animations.actions['Survey'].reset().fadeIn(0.5).play()
            }
        }

        return() => 
        {
            endCharacterAnimation()
        }
    }, [forward])

    useFrame((state, delta) =>
    {
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
            lastXPos(cameraPosition.x)
            lastYPos(cameraPosition.y)
            lastZPos(cameraPosition.z)
        }
    })
    

    return <> 
        <primitive castShadow receiveShadow ref={body} object={model.scene} scale={0.02}/>
    </>
}
useGLTF.preload('./Fox/glTF/Fox.gltf')