import './App.css';
import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import StartEndComponent from './components/StartEndComponent';
import FormTimeComponent from './components/FormTimeComponent';
const soap = require('soap-everywhere');
// include OpenLayers
var ol = require('openlayers');


function App() {
  
  const [ville_depart, setVille_depart] = useState();
  const [ville_arrivee, setVille_arrivee] = useState();
  const [gps1, setGps1] = useState([]);
  const [gps2, setGps2] = useState([]);
  const [distance, setDistance] = useState();
  const [autonomie, setAutonomie] = useState();
  const [tempsChargement, setTempsChargement] = useState();
  const [temps, setTemps] = useState(0);


  function calculDistance()
  {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(gps2[0] - gps1[0]);  // deg2rad below
    var dLon = deg2rad(gps2[1] - gps1[1]);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(gps1[0])) * Math.cos(deg2rad(gps2[0])) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    // arrondir
    d = Math.round(d * 100) / 100;
    setDistance(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }



// Créer les points de départ et d'arrivée
var start = ol.proj.fromLonLat([-122.4194, 37.7749]);
var end = ol.proj.fromLonLat([-121.8811, 37.3352]);

// Créer une couche vectorielle pour l'itinéraire
var routeLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: []
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 6,
      color: [40, 40, 40, 0.8]
    })
  })
});

// Ajouter la couche vectorielle à la carte
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    routeLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-122.15, 37.47]),
    zoom: 9
  })
});

// Calculer l'itinéraire avec l'API OSRM
var url = 'https://router.project-osrm.org/route/v1/driving/' +
  ol.proj.toLonLat(start)[1] + ',' + ol.proj.toLonLat(start)[0] + ';' +
  ol.proj.toLonLat(end)[1] + ',' + ol.proj.toLonLat(end)[0] + '?steps=true';

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var route = json.routes[0].geometry;
    var routeFeature = new ol.format.Polyline({
      factor: 1e6
    }).readFeature(route, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    routeLayer.getSource().addFeature(routeFeature);

    // Ajuster la vue de la carte pour s'adapter à la ligne d'itinéraire
    var extent = routeFeature.getGeometry().getExtent();
    map.getView().fit(extent, {
      padding: [100, 100, 100, 100]
    });
  });

  


var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-122.4194, 37.7749]), // Centrez la carte sur un point par défaut
    zoom: 12
  })
});



  return (
    <>
      <div className="App">

        <h1 className="title">Voyage APP</h1>
          <StartEndComponent />        

        <div class="container">
          <FormTimeComponent/>

        {/* <div className="map" id="map"> */}
              {/* <img className="imgmap" src="https://as1.ftcdn.net/v2/jpg/02/25/77/30/1000_F_225773013_7VnI8Q20BuedFagxj2xvAcYNBTO5QhbN.jpg" alt="placeholder" /> */}
          {/* </div> */}
          </div>

      </div>
    </>
      
    
  );
}

export default App;
