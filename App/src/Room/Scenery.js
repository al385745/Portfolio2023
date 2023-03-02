import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import gsap from 'gsap';
import * as THREE from 'three'

export default function Scenery(props) {

    const {nodes, materials} = useGLTF("/Suelo.glb");
    // nodes.Suelo.material.transparent=true
    const loadPlane = useRef()
    var animationDone = false


    // Initial Fade Out
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
                    ease: "power2.in",
                    onComplete: ()=>{
                        document.querySelector('.point-0').classList.add('visible')
                        document.querySelector('.point-1').classList.add('visible')
                        document.querySelector('.point-2').classList.add('visible')
                        document.querySelector('.point-3').classList.add('visible')
                        document.querySelector('.point-Right').classList.add('visible')
                        loadPlane.current.material.visible=false
                    }
                }
            )
        }
    })

    return <>
        <group {...props} dispose={null} scale={0.3} position={[5, 0, 5]}>
            <mesh
                receiveShadow
                geometry={nodes.Suelo.geometry}
                // material={materials.Material}
                material={new THREE.MeshStandardMaterial({color: 0x8a6642})}
            />
        </group>

        <color attach="background" args={['#d8f9ff']}/>
        <mesh ref={loadPlane} position={[-3, 5, 5]} scale={2} rotation-x={Math.PI*0.5} rotation-z={Math.PI*0.5} rotation-y={-Math.PI/1.5}>
            <planeBufferGeometry attach="geometry" args={[25, 15]} />
            <meshBasicMaterial attach="material" color="black" />
        </mesh>
    </>
}

useGLTF.preload("/PortfolioModel.glb");