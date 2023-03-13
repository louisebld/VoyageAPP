import React, { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import L from 'leaflet';
import 'leaflet-routing-machine';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { destinationPoint } from "../functions/destinationPoint";
import findBorne from '../services/bornesService'
import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';
import {chargingStationQuery} from '../services/stationListService';
import { Icon } from 'leaflet'
import { kmcharge } from "../functions/kmcharge";
import {client} from '../services/stationListService';

const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });
var greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
})
  
var map = null;
var mapWaypoints = [];

function Map() {
  // const position = [51.505, -0.09]
  
  var gps1 = useSelector((state) => state.map.depart);
  var gps2 = useSelector((state) => state.map.arrivee);

  var zoom = useSelector((state) => state.map.zoom);
  var center = useSelector((state) => state.map.center);
  var markers = useSelector((state) => state.map.markers);

  var autonomie = useSelector((state) => state.datas.autonomie);
  

  var waypoints = useSelector((state) => state.map.waypoints);

  const [latlngs, setLatlngs] = useState([gps1, gps2]); // tableau des points à relier
  const bounds = [gps1, gps2];

  function calculIndiceCoordonnees(indiceMax, distancetotale, autonomie) {
    
    var indices = [];
    distancetotale = distancetotale/1000;
    var nbRecharge = Math.round(distancetotale / autonomie)-1;
    for (var i = 1; i < nbRecharge+1; i++) {
      var indiceRecharge = Math.round((i * autonomie / distancetotale) * indiceMax);
      indices.push(indiceRecharge);
    }

    return indices;
  }


  useEffect(() => {

      if (map !== undefined && map !== null) { map.remove(); }
  
    
      map = L.map("map", {
        center: center,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false,
        dragging: true
      });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    mapWaypoints = [
      L.latLng(gps1[0], gps1[1]),
      L.latLng(gps2[0], gps2[1])
    ]
    
    const controls = L.Routing.control({
        waypoints: mapWaypoints,
        createMarker: function(i, waypoint, n) {
          let icon;
          if (i === 0 || i === n - 1) {
              icon = iconMarker;
          } else {
              icon = greenIcon;
          }

          const marker = L.marker(waypoint.latLng, {
              draggable: true,
              icon: icon
          });

          return marker;
      },
      addWaypoints: false

    }).addTo(map);



    controls.on('routesfound', function (e) {

      var routes = e.routes;

      var summary = routes[0].summary;
      var distanceTotale = summary.totalDistance;
      var indiceMax = routes[0].waypointIndices[1];
      
      var indicesPoint = calculIndiceCoordonnees(indiceMax, distanceTotale, autonomie-15);

      let waypoints = controls.getWaypoints();

      var waypointssave = [];

      console.log(routes)
      console.log("ici aussi les potes")
      console.log("indices", indicesPoint)
      indicesPoint.forEach((indice) => {
        console.log("je passe ici", indice);
        var point = routes[0].coordinates[indice];
        
        var lat = point.lat;
        var lng = point.lng;

        var way = L.latLng(lat + 0.1, lng);
        console.log("way", way)

        client.query(chargingStationQuery, { lat, lng }).toPromise().then((result) => {
            // add waypoint
          console.log("result", result)
          var waypoint = L.latLng(result.data.stationAround[0].location.coordinates[1], result.data.stationAround[0].location.coordinates[0]);
          waypointssave.push(waypoint);
          console.log("waypointssave", waypointssave)

      mapWaypoints = [
        L.latLng(gps1[0], gps1[1]),
        ...waypointssave,
        L.latLng(gps2[0], gps2[1])
      ]
      controls.off('routesfound');

      console.log("mapWaypoints", mapWaypoints)

      controls.setWaypoints(mapWaypoints);


        });

        

      })


      console.log("waypointssave", waypointssave)

      var nouveau = [
        L.latLng(45.564601, 5.917781),
        L.latLng(40.564601, 4.917781),

      ]

      

    });



    // controls.setWaypoints(waypoints);

    // waypoints.add(L.latLng(gps2[0], gps2[1]));
    // waypoints.add(L.latLng(gps2[0], gps2[1]));

    if (bounds[0].length > 0)
    {
      map.fitBounds(bounds);
      }
    // map.fitBounds(bounds);
  }, [latlngs, bounds]);

  return (
    <div className="map" id="map">
    </div>
  );
}

export default Map;