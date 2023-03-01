import { useAnimations, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import Globals from '../Experience/Globals'

export default function Player()
{
    const model = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(model.animations, model.scene)
    animations.actions['Survey'].play()
    const body = useRef()
    
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
            else
            {
                animations.actions['Walk'].fadeOut(0.5)
                animations.actions['Survey'].reset().fadeIn(0.5).play()
            }
        }

        return() => 
        {
            animations.actions['Survey'].fadeOut(0.5)
            animations.actions['Walk'].fadeOut(0.5)
            endCharacterAnimation()
        }
    }, [forward, backward])

    useFrame((state, delta) =>
    {
        if (!insideRoom)
        {
            // Move Character
            if (forward)
            model.scene.position.z += delta * speed
            else if (backward)
            model.scene.position.z -= delta * speed
            
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
    })
    

    return <> 
        <primitive ref={body} object={model.scene} scale={0.02} position-y={-1}/>
    </>
}
useGLTF.preload('./Fox/glTF/Fox.gltf')