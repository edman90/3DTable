import React, { createContext, useState } from 'react'
export const CoordsContext = createContext()
export default function CoordsContextProvider (props) {
    const [coords , setCoords] = useState('510')
    const saveCoords = (newCoords) => {
        setCoords(newCoords)
    }
    return (
        <CoordsContext.Provider
            value={{
                coords, saveCoords
            }}>
            {props.children}
        </CoordsContext.Provider>
    )
}
