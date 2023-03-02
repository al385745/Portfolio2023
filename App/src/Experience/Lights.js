import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { useMemo } from 'react'

export default function Lights()
{
    {/* DEBUG */}
    const dirLit = useMemo(() => {
        return {
            x: { value: -0.5, step: 0.1 },
            y: { value: 10, step: 0.1 },
            z: { value: 0, step: 0.1 },
            shadow: true,
            intensity: {value: 1.5, step: 0.01},
            bias: {value: 0.14, step: 0.01}
        }
    }, [])

    const ambLit = useMemo(() => {
        return {
            intensity: {value: 0.5, step: 0.01},
            bias: {value: 0.04, step: 0.01}
        }
    }, [])

    const lDir = useControls('L_Directional', dirLit)
    const lAm = useControls('L_Ambient', ambLit)
    const light = useRef()

    useFrame((state)=>
    {
        light.current.position.z = state.camera.position.z + 3
        light.current.target.position.z = state.camera.position.z + 4
        light.current.target.updateMatrixWorld()
    })

    return <>
        <Perf position="top-left"/>

        <directionalLight 
            ref={light}
            position={[lDir.x, lDir.y, lDir.z]}
            intensity= { lDir.intensity }
            castShadow={lDir.shadow}
            shadow-normalBias={ lDir.bias }
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0}
            shadow-camera-far={15}
            shadow-camera-top={15}
            shadow-camera-right={15}
            shadow-camera-bottom={-15}
            shadow-camera-left={-15}
        />
        <ambientLight intensity={ lAm.intensity } />
    </>
}