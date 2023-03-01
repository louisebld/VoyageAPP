import React, { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import L from 'leaflet';
import 'leaflet-routing-machine';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'


function Map() {
  // const position = [51.505, -0.09]
  
  var gps1 = useSelector((state) => state.map.depart);
  var gps2 = useSelector((state) => state.map.arrivee);

  var zoom = useSelector((state) => state.map.zoom);
  var center = useSelector((state) => state.map.center);
  var markers = useSelector((state) => state.map.markers);

  var waypoints = useSelector((state) => state.map.waypoints);

  // var polyline = useSelector((state) => state.map.polyline);
  // var bounds = useSelector((state) => state.map.bounds);

  const position = [51.505, -0.09]; // position initiale
  // const gps1 = [51.505, -0.1]; // premier point

  const [latlngs, setLatlngs] = useState([gps1, gps2]); // tableau des points à relier
  const bounds = [gps1, gps2];

  console.log("bounds", bounds)




  const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });

  useEffect(() => {
    // map.off();
    // map.remove();

    var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
    }
    
    var map = L.map("map", {
      center: center,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: true
    });




    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);


    
    const controls = L.Routing.control({
    waypoints: [
        L.latLng(gps1[0], gps1[1]),
        L.latLng(gps2[0], gps2[1])
    ]
  }).addTo(map);

    // ajoute les marqueurs sur la carte
    markers.forEach((marker) => {
      // console.log("marker", marker)
      console.log("ajoute un marqueur", marker)
      L.marker(marker, { icon: iconMarker }).addTo(map);
    });

    map.fitBounds(bounds);
  }, [latlngs, bounds]);

  return (
    <div className="map" id="map">
    </div>
  );
}

export default Map;