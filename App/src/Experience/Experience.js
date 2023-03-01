import { useRef, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'
import gsap from 'gsap'
import Camera from './Camera.js'
import Scenery from './Scenery.js'
import Lights from './Lights.js'
import Player from '../Room/Player.js'
import Doors from '../Room/Doors.js'
import Rooms from '../Room/Rooms.js'

// Make with a plane (avoid mix css and javascript, bad for performance)
const loadingBarElement = document.querySelector('.loading-bar')

export default function Experience()
{
    return <>
        <color attach="background" args={['#201919']}/>
        <Camera/>
        <Lights/>
        <Suspense fallback={<Loader/>}/*fallback={ <Placeholder position-y={0.5} scale={ [2, 3, 2] }*/>  
            <Player/>
            <Rooms/>
            <Scenery/>
            <Doors/>
        </Suspense>
    </>
}

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()

    const reference = useRef()

    if(loadingBarElement != null && reference != undefined)
    {
        if(loaded)
        {
            window.setTimeout(() => {
                gsap.to(
                    reference.material.opacity, 
                    { duration: 3 , value: 0, delay: 1 })   
                // Update loadingBarElement
                loadingBarElement.classList.add('ended')
                loadingBarElement.style.transform = ''  
            }, 500)
        }
        if (progress){
            console.log(loadingBarElement)
            loadingBarElement.style.transform = `scaleX(${progress})`
        }
    }


    return <>
        <mesh ref={reference} position={[12, 0, 0]} rotateY={90}>
            <planeBufferGeometry attach="geometry" args={[25, 15]} />
            <meshStandardMaterial attach="material" color="black" transparent={true} />
        </mesh>
    </>
    // return <Html center>{progress} % loaded</Html>
}