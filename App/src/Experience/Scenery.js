import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import Globals from './Globals';

export default function Scenery(props) {

    const {nodes, materials} = useGLTF("/PortfolioModel.glb");
    nodes.Scenario.material.transparent=true
    var animationDone = false

    const insideRoom = Globals((state)=> state.insideRoom)

    // useFrame(()=>
    // {
    //     if(insideRoom)
    //     {
    //         gsap.to(
    //             nodes.Scenario.material,
    //             {
    //                 duration: 2,
    //                 opacity: 0,
    //                 ease: "sine",
    //             }
    //         )
    //     }
    //     else {
    //         gsap.to(
    //             nodes.Scenario.material,
    //             {
    //                 duration: 2,
    //                 opacity: 100,
    //                 ease: "sine",
    //             },
    //             0
    //         )
    //     }
    // })

    return (
        <group>
            <mesh
                geometry={nodes.Scenario.geometry}
                material={nodes.Scenario.material}
                position={[8, 4, 10]}
                scale={0.1}
            />
        </group>
    )
}

useGLTF.preload("/PortfolioModel.glb");