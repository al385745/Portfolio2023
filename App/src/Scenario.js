import { useGLTF } from '@react-three/drei'
import { useRef } from 'react';
import * as THREE from 'three'

export default function Scenario(props) {

    const {nodes, materials} = useGLTF("/PortfolioModel.glb");
    const body = useRef()

    nodes.Scenario.material.color = new THREE.Color('lightblue')

    return (
        <mesh
        //   castShadow
        //   receiveShadow
            // onClick={ ()=> 
            //     nodes.Scenario.material.color = new THREE.Color('limegreen')
            // }
            ref={body}
            geometry={nodes.Scenario.geometry}
            material={nodes.Scenario.material}
            position={[8, 4, 10]}
            scale={0.1}
        />

    );
}

useGLTF.preload("/PortfolioModel.glb"); 