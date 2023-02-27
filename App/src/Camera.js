import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useMemo } from 'react'
import { useControls } from 'leva'
import { PerspectiveCamera } from '@react-three/drei';

export default function Camera()
{
    const cameraDebug = useMemo(() => {
        return {
            x: {value: -5.5, step: 0.1},
            y: {value: 8.0, step: 0.1},
            z: {value: 2.7, step: 0.1},
            xOrbit: {value: 0.5, step: 0.01},
            yOrbit: {value: 1.3, step: 0.01},
            zOrbit: {value: 0.5, step: 0.01},
            fov: {value: 55, step: 1},
            far: {value: 200, step: 10},
            near: {value: 0.1, step: 0.1},
            zoom: {value: 0.75, step: 0.01}
        }
    }, [])
      
    const camDebug = useControls('Camera', cameraDebug)

    useThree(state=>
    {
        state.camera.position.set(camDebug.x, camDebug.y, camDebug.z)
        state.camera.rotation.set(
            camDebug.xOrbit * Math.PI,
            camDebug.yOrbit * Math.PI,
            camDebug.zOrbit * Math.PI,
        )
        state.camera.fov= camDebug.fov
        state.camera.near= camDebug.near
        state.camera.far= camDebug.far
        state.camera.zoom= camDebug.zoom
        state.camera.updateProjectionMatrix()
    });

    return <>
        <PerspectiveCamera/>
    </>
}