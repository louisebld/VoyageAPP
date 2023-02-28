import React from "react";
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


function Map() {
  // const position = [51.505, -0.09]
  
  var gps1 = useSelector((state) => state.datas.gps_depart);
  // var gps2 = useSelector((state) => state.datas.gps_arrivee);

  const position = [51.505, -0.09]; // position initiale
  // const gps1 = [51.505, -0.1]; // premier point
  const gps2 = [51.507, -0.12]; // deuxième point
  const [latlngs, setLatlngs] = useState([gps1, gps2]); // tableau des points à relier
  const bounds = [gps1, gps2];



  const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });

  return (
    <div className="map" id="map">
    <MapContainer bounds={bounds} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={gps1} icon={iconMarker}>
        <Popup>
          GPS 1
        </Popup>
      </Marker>
      <Marker position={gps2} icon={iconMarker}>
        <Popup>
          GPS 2
        </Popup>
      </Marker>
      <Polyline pathOptions={{color: 'purple'}} positions={latlngs} smoothFactor={1} />
    </MapContainer>

    </div>
  );
}

export default Map;