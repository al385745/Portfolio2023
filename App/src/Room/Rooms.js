import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { BoxGeometry } from 'three';

export default function Scenario(props) {

    const {nodes, materials} = useGLTF("/PortfolioModel.glb");
    const firstRoom = useRef()
    const secondRoom = useRef()
    const thirdRoom = useRef()
    const fourthRoom = useRef()

    nodes.Scenario.material.color = new THREE.Color('lightblue')

    return (
        <group position={[8, 4, 10]} visible={true}>
            <mesh
            ref={firstRoom}
            geometry={new THREE.BoxGeometry(1, 1, 1)}
            material={new THREE.MeshStandardMaterial({color:'white'})}
            position={[0, 0, 0]}
            />
            <mesh
            ref={secondRoom}
            geometry={new THREE.BoxGeometry(1, 1, 1)}
            material={new THREE.MeshStandardMaterial({color:'white'})}
            position={[0, 0, 27]}
            />
            <mesh
            ref={thirdRoom}
            geometry={new THREE.BoxGeometry(1, 1, 1)}
            material={new THREE.MeshStandardMaterial({color:'white'})}
            position={[0, 0, 54]}
            />
            <mesh
            ref={fourthRoom}
            geometry={new THREE.BoxGeometry(1, 1, 1)}
            material={new THREE.MeshStandardMaterial({color:'white'})}
            position={[0, 0, 81]}
            />
        </group>
    );
}