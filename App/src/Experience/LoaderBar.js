import * as THREE from 'three'
import { gsap } from 'gsap'
import { useEffect } from 'react'

// Make with a plane (avoid mix css and javascript, bad for performance)
const loadingBarElement = document.querySelector('.loading-bar')

export default function Loader()
{
    // Overlay Setup
    const overlayGeo = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
    const overlayMat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms:
        {
            uAlpha: { value: 1 }
        },
        vertexShader: `
            void main() { gl_Position = vec4(position, 1.0); } 
        `,
        fragmentShader: `
            uniform float uAlpha;
            void main() { gl_FragColor = vec4(0.1176, 0.1019, 0.1254, uAlpha); }
        `
    })
    
    new THREE.Mesh(
        overlayGeo,
        overlayMat
    )

    useEffect(()=>
    {
        new THREE.LoadingManager(
            ()=>
            {
                window.setTimeout(() => {
                    gsap.to(overlayMat.uniforms.uAlpha, { duration: 3 , value: 0, delay: 1 })   
                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''  
                }, 500)
            },
            (itemUrl, itemsLoaded, itemsTotal)=>
            {
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )
    },)
    

    // LoadingCompleted(material) 
    // {
    //     // Wait a little
    //     // gsap.delayedCall(0.5, ()=> {
    //         /* ... */
    //     // })
        
    // }

    // LoadingProgress(itemUrl, itemsLoaded, itemsTotal)
    // {
    //     // Calculate the progress and update the loadingBarElement
       
    // }

    // LoadingError()
    // {
    //     console.log('Error on Loading Resources');
    // }
}
