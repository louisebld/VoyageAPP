import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map2() {
  const [position, setPosition] = useState([51.505, -0.09]); // position initiale
  const [gps1, setGps1] = useState(null); // coordonnées GPS du premier point

  const handleGpsSubmit = (event) => {
    event.preventDefault();
    // obtenir les coordonnées GPS à partir de l'entrée de l'utilisateur
    const gpsInput = event.target.elements.gpsInput.value.split(',');
    const latitude = parseFloat(gpsInput[0].trim());
    const longitude = parseFloat(gpsInput[1].trim());
    // mettre à jour les coordonnées GPS du premier point et le centre de la carte
    setGps1([latitude, longitude]);
    setPosition([latitude, longitude]);
  };

  return (
    <div>
      <form onSubmit={handleGpsSubmit}>
        <label>
          Entrez les coordonnées GPS :
          <input type="text" name="gpsInput" />
        </label>
        <button type="submit">Afficher</button>
      </form>
      <MapContainer center={position} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gps1 && (
          <Marker position={gps1}>
            <Popup>
              GPS 1
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map2;
