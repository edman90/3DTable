import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import '@bopen/leaflet-area-selection/dist/index.css';




function App() {

  return (
      <MapContainer
          className="markercluster-map"
          center={[51.0, 19.0]}
          zoom={4}
          maxZoom={18}
      >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />


      </MapContainer>
  );
}

export default App;
