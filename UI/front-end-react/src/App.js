import logo from './logo.svg';
import React, { useState, useContext } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-area-select';
import AreaSelect from "./AreaSelect";
import SelectedCoords from "./components/selectedCoords";
import {CoordsContext} from "./contexts/coordsContext";


function App() {

    const position = [39.8282, -98.5795];
    const address = React.useRef()
    const latRef = React.useRef()
    const longRef = React.useRef()
    const mapRef = React.useRef()
    const {coords, saveCoords} = useContext(CoordsContext)
    function send() {
        console.log(JSON.stringify({coords: "50"}))
        const response = fetch('http://127.0.0.1:5050/servo', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({coords: coords}),
            });
    }

    function locate() {
        if(latRef.current.value.length > 0 && longRef.current.value.length > 0){
            const latLong = [latRef.current.value, longRef.current.value]
            mapRef.current.setView(latLong, 40);
            return
        }
        const response = fetch('http://127.0.0.1:5050/address', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({addy: address.current.value}),
        }).then((response) => response.text())
            .then(data=>{
                const dataSplit = data.split(" ")
                mapRef.current.setView(dataSplit, 40);})
    }

    function reset() {
        mapRef.current.setView(position, 4)
    }

  return ( <body>
      <div>
          <header>
              <a href="#" class="logo">Topographic Table</a>
          </header>
          <div>
          <div style={{display:"block", marginRight:"20px"}}>
          <label style={{display:"block", marginRight:"20px"}}>Enter an address:</label>
              <input type="text" ref={address} style={{width:"500px"}}/>
              <div>
                <p>
                    OR
                </p>
              </div>
          </div>
          <div style={{display:"block", marginRight:"20px"}}>
                  <label style={{display:"block", marginRight:"20px"}}>Enter a latitude:</label>
                      <input type="text" ref={latRef}/>

          </div>
          <div style={{display:"block", marginRight:"20px"}}>
                  <label style={{display:"block", marginRight:"20px"}}>Enter a longitude:</label>
                      <input type="text" ref={longRef}/>
          </div>
          </div>
          <div class="buttons">
          <button onClick={locate}>Locate</button>
          <button onClick={reset}>Reset</button>
          <button onClick={send}>Send to Table</button>
          </div>
          <div style={{clear: "both"}}>
              <MapContainer ref={mapRef} center={position} zoom={4} style={{ height: "100vh" }}>
                  <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <AreaSelect />
              </MapContainer>
          </div>
      </div>
      </body>
  );
}

export default App;
