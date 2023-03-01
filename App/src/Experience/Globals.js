import create from 'zustand'
import {subscribeWithSelector} from 'zustand/middleware'

export default create(subscribeWithSelector((set)=>
{
    return {

        // Attributes
        currentDoor: "none",
        insideRoom: false,
        enabledRoomRotation: false,
        zPos: 0,

        // Methods
        enterRoom: (value) =>   
        {
            set(()=> 
            { 
                return {insideRoom: value } 
            })
        },
        doorClicked: (value) => 
        {
            set(()=> 
            { 
                return {currentDoor: value } 
            })
        },

        startRotation: (value)=>
        { 
            set(()=> 
            { 
                return {enabledRoomRotation: value } 
            })
        },

        lastZPos: (value)=>
        { 
            set(()=> 
            { 
                return {zPos: value } 
            })
        },
    }
}))