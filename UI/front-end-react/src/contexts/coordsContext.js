import React, { createContext, useState } from 'react'
export const CoordsContext = createContext()
const CoordsContextProvider = (props) => {
    const [coords , setCoords] = useState('510')
    return (
        <CoordsContext.Provider
            value={{
                coords
            }}>
            {props.children}
        </CoordsContext.Provider>
    )
}
export default CoordsContextProvider