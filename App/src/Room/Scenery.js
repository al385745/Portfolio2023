import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import gsap from 'gsap';
import Globals from '../Experience/Globals.js';

export default function Scenery(props) {

    const {nodes, materials} = useGLTF("/PortfolioModel.glb");
    nodes.Scenario.material.transparent=true
    const loadPlane = useRef()

    var animationDone = false
    const insideRoom = Globals((state)=> state.insideRoom)

    useFrame((state)=>
    {
        
        if(!animationDone && loadPlane != null)
        {
            loadPlane.current.material.transparent = true
            animationDone = true
            gsap.to(
                loadPlane.current.material,
                {
                    duration: 2,
                    opacity: 0,
                    ease: "linear",
                    onComplete: ()=>{loadPlane.current.material.visible=false}
                }
            )
        }
    })

    return (
        <group>
            <mesh
                geometry={nodes.Scenario.geometry}
                material={nodes.Scenario.material}
                position={[8, 4, 10]}
                scale={0.1}
            />
            <mesh ref={loadPlane} position={[-5, 5, 5]} rotation-x={Math.PI*0.5} rotation-z={Math.PI*0.5} rotation-y={-Math.PI/1.5}>
                <planeBufferGeometry attach="geometry" args={[25, 15]} />
                <meshBasicMaterial attach="material" color="black" />
            </mesh>
        </group>
    )
}

useGLTF.preload("/PortfolioModel.glb");