import { useKeyboardControls } from "@react-three/drei"
import Globals from "./Globals.js"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"

export default function Interface()
{
    const door1Clicked = Globals((state)=> state.door1Clicked)
    const door2Clicked = Globals((state)=> state.door2Clicked)
    const door3Clicked = Globals((state)=> state.door3Clicked)
    const door4Clicked = Globals((state)=> state.door4Clicked)

    const movePlayerLeft = Globals((state)=> state.movePlayerLeft)
    const movePlayerRight = Globals((state)=> state.movePlayerRight)
    const stopPlayerMovment = Globals((state)=> state.stopPlayerMovment)

    const forward = useKeyboardControls((state)=>state.forward)
    const escape = useKeyboardControls((state)=>state.escape)

    return <>
        <div className="interface">
            <div className="door1" onClick={door1Clicked}>Hola</div>

            {/* <div className="point point-Left visible" onClick={movePlayerLeft}>
                <div className="label">Left</div>
            </div> */}

        </div>
        <div className="point point-Right visible" >
            <div className="label">Right</div>
        </div>
        <div className="point point-Rotate" >
            <div className="label">Rot</div>
        </div>
        <div className="point point-Exit">
            <div className="label">Exit</div>
        </div>

        <div className="point point-0 visible" onMouseDown={door1Clicked}>
            <div className="label"></div>
        </div>
        <div className="point point-1 visible" onMouseDown={door2Clicked}>
            <div className="label"></div>
        </div>
        <div className="point point-2 visible" onMouseDown={door3Clicked}>
            <div className="label"></div>
        </div>
        <div className="point point-3 visible" onMouseDown={door4Clicked}>
            <div className="label"></div>
            {/* <div className="text">Buenas que tal</div> */}
        </div>

        
    </>
}