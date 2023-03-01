import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useMemo } from 'react'

export default function Lights()
{
    {/* DEBUG */}
    const dirLit = useMemo(() => {
        return {
            x: { value: -2, step: 0.1 },
            y: { value: 4, step: 0.1 },
            z: { value: -5.5, step: 0.1 },
            intensity: {value: 1.5, step: 0.01}
        }
    }, [])

    const ambLit = useMemo(() => {
        return {
            intensity: {value: 0.5, step: 0.01},
            shadow: false,
            bias: {value: 0.04, step: 0.01}
        }
    }, [])

    const lDir = useControls('L_Directional', dirLit)
    const lAm = useControls('L_Ambient', ambLit)

    return <>
        <Perf position="top-left"/>

        <directionalLight 
            position={[lDir.x, lDir.y, lDir.z]}
            intensity= { lDir.intensity }
            castShadow={lDir.shadow}
            shadow-normalBias={ lDir.bias }
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={-10}
            shadow-camera-left={-10}
        />
        <ambientLight intensity={ lAm.intensity } />
    </>
}