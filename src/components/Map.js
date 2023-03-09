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
import findBorne from '../services/bornesservice'
import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';

import { Icon } from 'leaflet'
import { kmcharge } from "../functions/kmcharge";
const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });
var greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
})
  
var map = null;

export const headers = {
  'x-client-id': '6402f92d85c5c3f0221ae397',
  'x-app-id': '6402f92d85c5c3f0221ae399'
};


export const client = createClient({
  url: 'https://api.chargetrip.io/graphql',
  fetchOptions: {
    method: 'POST',
    headers,
  },
  exchanges: [...defaultExchanges],
});

const chargingStationQuery = qql`
    query stationAround ($lat: Float!, $lng: Float!) {
        stationAround(
            filter: {
                location: { 
                    type: Point,
                    coordinates: [$lng, $lat]
                }
                distance: 10000
            }
            size: 10
            page: 0
        ) {
            location {
                type
                coordinates
            }
            power
            speed
            status
            }
        }
    `;



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

  function calculIndiceCoordonnees(indiceMax, distancetotale, autonomie) {
    var indiceMax = 10184;
    var distancetotale = 1000;
    // var indice = Math.round((autonomie / distancetotale) * indiceMax);
    
    var indices = [];
    var nbRecharge = Math.round(distancetotale / autonomie);
    for (var i = 0; i < nbRecharge; i++) {
      var indiceRecharge = Math.round((i * autonomie / distancetotale) * indiceMax);
      indices.push(indiceRecharge);
    }

    return indices;
  }

  // function askBorne(lat, lng) {
  //   client.query(chargingStationQuery, { lat, lng }).toPromise().then((result) => {
  //     console.log(result);
  //   });


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
      },
      addWaypoints: false

    }).addTo(map);



    controls.on('routesfound', function (e) {
      var routes = e.routes;
      console.log("routes", routes)
      var summary = routes[0].summary;
      var distanceTotale = summary.totalDistance;
      var indiceMax = routes[0].coordinates.length;
      var indicesPoint = calculIndiceCoordonnees(indiceMax, distanceTotale, 500);
      // console.log("points", points)
      console.log("points", indicesPoint)

      indicesPoint.forEach((indice) => {
        var point = routes[0].coordinates[indice];
        console.log("point", point)
        
        // var marker = L.marker([point.lat, point.lng], { icon: iconMarker }).addTo(map)
        // findBorne(point.lat, point.lng).then((borne) => {
        //   var borne = borne;
        //   var coordonnes = borne["geo_point_borne"];

        //   var marker = L.marker([coordonnes[1], coordonnes[0]], { icon: iconMarker }).addTo(map)
        //   marker.bindPopup(borne["ad_station"] + " " + borne["code_insee"]);
        // })

        var lat = point.lat;
        var lng = point.lng;
        // client.query(chargingStationQuery, { lat, lng }).toPromise().then((result) => {
        //   console.log("result", result)
        //   console.log(result.data.stationAround[0].location.coordinates);
        //   var marker = L.marker([result.data.stationAround[0].location.coordinates[1], result.data.stationAround[0].location.coordinates[0]], { icon: iconMarker }).addTo(map)
        // });

          let waypoints = controls.getWaypoints();
          waypoints.splice(1, 0, L.latLng(46.5, -0.1));
          controls.setWaypoints(waypoints);
        

      })
    });

    // var rechargePoints = kmcharge(gps1, gps2, 500, 100)

    // rechargePoints.forEach((recharge) => {
    //   var Point = destinationPoint(gps1[0], gps1[1], gps2[0], gps2[1], recharge)
    //   findBorne(Point[0], Point[1]).then((borne) => {
    //     var borne = borne;
    //     var coordonnes = borne["geo_point_borne"];

    //     var marker = L.marker([coordonnes[1], coordonnes[0]], { icon: iconMarker }).addTo(map)
    //     marker.bindPopup(borne["ad_station"] + " " + borne["code_insee"]);
    //   })
    // });


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