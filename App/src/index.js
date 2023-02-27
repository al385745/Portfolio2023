import './style.css';
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import * as THREE from 'three'
import { KeyboardControls } from '@react-three/drei';
import Experience from './Experience/Experience.js'

const root = ReactDOM.createRoot(document.querySelector('#root'));        
root.render(
  <StrictMode>
      <Leva collapsed />
      <KeyboardControls
        map={ [
           { name: 'forward', keys: ['ArrowRight', 'KeyD'] },
           { name: 'backward', keys: ['ArrowLeft', 'KeyA'] }
        ] }
      >
        <Canvas
            dpr={ [1, 2] } // clamp pixel ratio (default)
            gl={ {
                antialias:true, // default
                toneMapping: THREE.ACESFilmicToneMapping, // default
                outputEncoding: THREE.sRGBEncoding // (default)
                } } 
            shadows
            >
              <Experience/>
        </Canvas>
      </KeyboardControls>
  </StrictMode>
)