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

  const [latlngs, setLatlngs] = useState([gps1, gps2]); // tableau des points à relier
  const bounds = [gps1, gps2];

  const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });
  var greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
  })

  function destinationPoint(lat1, lon1, lat2, lon2, distance) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180; // Différence de latitude en radians
  const dLon = (lon2 - lon1) * Math.PI / 180; // Différence de longitude en radians
  const lat1Rad = lat1 * Math.PI / 180; // Latitude 1 en radians

  // Calculer l'angle entre les deux points
  const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1Rad) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1Rad) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
  const bearing = Math.atan2(y, x);

  // Convertir la distance en radians
  distance = distance / R;

  // Calculer les nouvelles coordonnées
  const lat3 = Math.asin(Math.sin(lat1Rad) * Math.cos(distance) + Math.cos(lat1Rad) * Math.sin(distance) * Math.cos(bearing));
  const lon3 = lon1 * Math.PI / 180 + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(lat1Rad), Math.cos(distance) - Math.sin(lat1Rad) * Math.sin(lat3));

  // Convertir les coordonnées en degrés
  const lat3Deg = lat3 * 180 / Math.PI;
  const lon3Deg = lon3 * 180 / Math.PI;

  return [lat3Deg, lon3Deg];
}



  useEffect(() => {

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
        ],
        createMarker: function(i, waypoint, n) {
            const marker = L.marker(waypoint.latLng, {
                draggable: true,
                icon: greenIcon
            });

            return marker;
        }
    }).addTo(map);

    // controls.hide()
    // L.control.hide();

    // ajoute les marqueurs sur la carte
    // markers.forEach((marker) => {
    //   console.log("ajoute un marqueur", marker)
    //   L.marker(marker, { icon: iconMarker }).addTo(map);
    // });

    var gps3 = destinationPoint(gps1[0], gps1[1], gps2[0], gps2[1], 100)
    console.log("gps3 : ", gps3)
    L.marker(gps3, {icon : iconMarker }).addTo(map);

    map.fitBounds(bounds);
  }, [latlngs, bounds]);

  return (
    <div className="map" id="map">
    </div>
  );
}

export default Map;