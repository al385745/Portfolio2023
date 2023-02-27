import { useAnimations, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboardControls } from '@react-three/drei'

export default function Player()
{
    const model = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(model.animations, model.scene)
    animations.actions['Survey'].play()
    const body = useRef()
    
    const [ subscribedKeys, getKeys ] = useKeyboardControls()

    const speed = 2

    useEffect(() => 
    {
        var currentValue = false

        subscribedKeys(
            (state) => state.forward || state.backward,
            (value) =>
            {
                currentValue = value
                if (value == true)
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
        )

        return() => 
        {
            animations.actions['Survey'].fadeOut(0.5)
            animations.actions['Walk'].fadeOut(0.5)
        }
    }, [])

    useFrame((state, delta) =>
    {
        const {forward, backward} = getKeys()

        if (forward)
            model.scene.position.z += delta * speed
        if (backward)
            model.scene.position.z -= delta * speed

        // Camera Follow
        // const bodyPosition = body.current.position

        // const cameraPosition = new THREE.Vector3()
        // cameraPosition.copy(bodyPosition)
        // cameraPosition.x -= 5
        // cameraPosition.y += 7.5

        // const cameraTarget = new THREE.Vector3()
        // cameraTarget.copy(bodyPosition)
        // cameraTarget.y += 0.25

        // state.camera.position.copy(cameraPosition)
        // state.camera.lookAt(cameraTarget)
    })
    

    return <> 
        <primitive ref={body} object={model.scene} scale={0.02} position-y={-1}/>
    </>
}
// useGLTF.preload('./hamburger-draco.glb')