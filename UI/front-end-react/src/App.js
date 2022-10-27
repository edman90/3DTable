import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-area-select';
import AreaSelect from "./AreaSelect";

function locate() {
    alert('You clicked locate!');
}
function reset() {
    alert('You clicked reset!');
}
function send() {
    alert('You clicked send to table!');
}

function App() {

    const position = [51.505, -0.09];

  return ( <body>
      <div>
          <header>
              <a href="#" class="logo">Topographic Table</a>
              <nav>
                  <ul>
                      <li><a href="#" style={{paddingRight: "70px"}}>Home</a></li>
                      <li><a href="#">Sandbox</a></li>
                  </ul>
              </nav>
          </header>
          <div>
          <div class="location">
              <form style={{paddingTop: "40px"}}>
          <label>Enter an address:
              <input type="text" />
          </label>
              </form>
              <div>
                <p>
                    OR
                </p>
              </div>
          </div>
          <div class="location">
              <form>
                  <label>Enter a latitude:
                      <input type="text" />
                  </label>
              </form>
          </div>
          <div class="location">
              <form style={{paddingBottom: "30px"}}>
                  <label>Enter a longitude:
                      <input type="text" />
                  </label>
              </form>
          </div>
          </div>
          <div class="buttons">
          <button onClick={locate}>Locate</button>
          <button onClick={reset}>Reset</button>
          <button onClick={send}>Send to Table</button>
          </div>
          <div style={{clear: "both"}}>
              <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
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
