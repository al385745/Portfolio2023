import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Suspense, useMemo } from 'react'
import Camera from './Camera.js'
import Player from './Player.js'
import Doors from './Doors.js'
import Scenario from './Scenario.js'
import Rooms from './Rooms.js'
import Placeholder from './Placeholder.js'

let instance = null

class MainExperience
{
    constructor(canvas)
    {
        // Singleton
        if(instance !== null)
            return instance; 
        
        instance = this
    }

    init(lDir, lAm)
    {
       return <>
            <Perf position="top-left"/>
            <color args={ ['#BFD4DB'] } attach="background" /> 

            <directionalLight 
                position={[lDir.x, lDir.y, lDir.z]}
                intensity= { lDir.intensity }
                castShadow={lDir.shadow}
                shadow-normalBias={ lDir.bias }
            />
            <ambientLight intensity={ lAm.intensity } />

            {/* MODEL */}
            <Camera/>
            <Suspense fallback={ <Placeholder position-y={0.5} scale={ [2, 3, 2] } /> }>  
                <Player/>
                <Rooms/>
                {/* <Scenario/> */}
                <Doors/>
            </Suspense>
        </>
    }
}

export default function Experience()
{
    const main = new MainExperience()

    {/* DEBUG */}
    const dirLit = useMemo(() => {
        return {
            x: { value: -2, step: 0.1 },
            y: { value: 4, step: 0.1 },
            z: { value: -5.5, step: 0.1 },
            intensity: {value: 0.6, step: 0.01}
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

    return main.init(lDir, lAm)
}