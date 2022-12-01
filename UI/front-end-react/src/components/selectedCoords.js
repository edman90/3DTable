import React, { Component, useState, useContext } from 'react';
import CoordsContext from "../contexts/coordsContext";

export default function SelectedCoords() {
    const coords = useContext(CoordsContext)
    return (
        <div className="selectedArea">
            <p> Your selected coordinates are: {coords}</p>
            <p> Click Send to Table </p>
        </div>
    )


}
