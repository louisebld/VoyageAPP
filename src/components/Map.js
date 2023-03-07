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

import { Icon } from 'leaflet'
import { kmcharge } from "../functions/kmcharge";
const iconMarker = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });
var greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12,41]
})
  
var map = null;


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

  useEffect(() => {

      // var container = L.DomUtil.get('map');
      //   if(container != null){
      //     container._leaflet_id = null;
      // }

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
      console.log(summary.totalDistance)
    });

    var rechargePoints = kmcharge(gps1, gps2, 500, 100)

    // kmcharge(gps1, gps2, 500, 100).then((rechargePoints) => {
    //   console.log("rechargePoints : ", rechargePoints)
    //   rechargePoints.forEach((recharge) => {
    //     L.marker(recharge, { icon: iconMarker }).addTo(map)
    //   });
    // })



    // var gps3 = destinationPoint(gps1[0], gps1[1], gps2[0], gps2[1], 200)
    // console.log("gps3 : ", gps3)
    // L.marker(gps3, {icon : iconMarker }).addTo(map);



    // console.log(rechargePoints)

    rechargePoints.forEach((recharge) => {
      var Point = destinationPoint(gps1[0], gps1[1], gps2[0], gps2[1], recharge)
      findBorne(Point[0], Point[1]).then((borne) => {
        var borne = borne;
        var coordonnes = borne["geo_point_borne"];

        var marker = L.marker([coordonnes[1], coordonnes[0]], { icon: iconMarker }).addTo(map)
        marker.bindPopup(borne["ad_station"] + " " + borne["code_insee"]);
      })
    });


    map.fitBounds(bounds);
  }, [latlngs, bounds]);

  return (
    <div className="map" id="map">
    </div>
  );
}

export default Map;