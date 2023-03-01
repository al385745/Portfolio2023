import { Suspense } from 'react'
import Camera from './Camera.js'
import Scenery from './Scenery.js'
import Placeholder from './Placeholder.js'
import Lights from './Lights.js'
import Interface from './Interface.js'
import Player from '../Room/Player.js'
import Doors from '../Room/Doors.js'
import Rooms from '../Room/Rooms.js'

export default function Experience()
{
    return <>
        <Lights/>
        <Camera/>
        <Suspense fallback={ <Placeholder position-y={0.5} scale={ [2, 3, 2] } /> }>  
            <Player/>
            <Rooms/>
            <Scenery/>
            <Doors/>
        </Suspense>
        <Interface/>
    </>
}