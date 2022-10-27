import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import '@bopen/leaflet-area-selection/dist/index.css';


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
          </div>
      </div>
      </body>
  );
}

export default App;
