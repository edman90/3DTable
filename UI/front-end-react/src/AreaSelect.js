import React, { useEffect, useContext} from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import fetch from "node-fetch";
import {CoordsContext} from "./contexts/coordsContext";

export default function AreaSelect() {
    const map = useMap();
    let layerGroup = L.layerGroup().addTo(map);
    const {coords, saveCoords} = useContext(CoordsContext)
    useEffect(() => {
        if (!map.selectArea) return;

        map.selectArea.enable();

        map.on("areaselected", (e) => {
            let selectedBounds = e.bounds.toBBoxString()
           // console.log(e.bounds.toBBoxString()); // lon, lat, lon, lat

            layerGroup.clearLayers()
            saveCoords(selectedBounds)
            console.log(coords)
            L.rectangle(e.bounds, { color: "blue", weight: 1 }).addTo(layerGroup);
        });

        // You can restrict selection area like this:
        const bounds = map.getBounds().pad(-0.25); // save current map bounds as restriction area
        // check restricted area on start and move
        map.selectArea.setValidate((layerPoint) => {
            return bounds.contains(this._map.layerPointToLatLng(layerPoint));
        });

        // now switch it off
        map.selectArea.setValidate();
    }, []);

    return null;
}
