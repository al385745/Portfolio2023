import create from 'zustand'
import {subscribeWithSelector} from 'zustand/middleware'

export default create(subscribeWithSelector((set)=>
{
    return {

        // Attributes
        currentDoor: "none",
        insideRoom: false,
        enabledRoomRotation: false,
        xPos: 0,
        yPos: 0,
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

        lastXPos: (value)=> { set(()=> { return {zPos: value }})},
        lastYPos: (value)=> { set(()=> { return {yPos: value }})},
        lastZPos: (value)=> { set(()=> { return {zPos: value }})},

        // Interface Doors
        door1Clicked: () => { set(()=> { return {currentDoor: "door1" } }) },
        door2Clicked: () => { set(()=> { return {currentDoor: "door2" } }) },
        door3Clicked: () => { set(()=> { return {currentDoor: "door3" } }) },
        door4Clicked: () => { set(()=> { return {currentDoor: "door4" } }) },
    }
}))