import './App.css';
import React, { useState } from 'react';
const soap = require('soap-everywhere');

function App() {
  
  const [ville_depart, setVille_depart] = useState();
  const [ville_arrivee, setVille_arrivee] = useState();
  const [gps1, setGps1] = useState([]);
  const [gps2, setGps2] = useState([]);
  const [distance, setDistance] = useState();
  const [autonomie, setAutonomie] = useState();
  const [tempsChargement, setTempsChargement] = useState();
  const [temps, setTemps] = useState(0);

  const handleDistanceChange = (event) => {
  setDistance(event.target.value);
}

// Fonction pour mettre à jour la valeur d'autonomie
const handleAutonomieChange = (event) => {
  setAutonomie(event.target.value);
}

// Fonction pour mettre à jour la valeur de temps de chargement
const handleTempsChargementChange = (event) => {
  setTempsChargement(event.target.value);
  }
  
  const handleVille_departChange = (event) => {
    setVille_depart(event.target.value);
    // requête pour récupérer la latitude et la longitude de la ville de départ
    fetch('https://api-adresse.data.gouv.fr/search/?q=' + ville_depart)
      .then(response => response.json())
      .then(data => {
        console.log(data.features[0].geometry.coordinates[0]);
        console.log(data.features[0].geometry.coordinates[1]);
        var lat1 = data.features[0].geometry.coordinates[0];
        var lon1 = data.features[0].geometry.coordinates[1];
        setGps1([lat1, lon1]);
        calculDistance();
      })
  }

  const handleVille_arriveeChange = (event) => {
    setVille_arrivee(event.target.value);
    fetch('https://api-adresse.data.gouv.fr/search/?q=' + ville_arrivee)
      .then(response => response.json())
      .then(data => {
        console.log(data.features[0].geometry.coordinates[0]);
        console.log(data.features[0].geometry.coordinates[1]);
        var lat2 = data.features[0].geometry.coordinates[0];
        var lon2 = data.features[0].geometry.coordinates[1];
        setGps2([lat2, lon2]);
      })
  }

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

  const switchVilles = () => {
    var temp = ville_depart;
    setVille_depart(ville_arrivee);
    setVille_arrivee(temp);
    calculDistance();
    handleVille_arriveeChange();
    handleVille_departChange();
  }



  const sendRequest = () => {
          // console.log("bjr");
    soap.createClient('http://127.0.0.1:8080/distance?wsdl', function (err, client) {
      client.distance({ distance: distance, autonomie: autonomie, tempschargement: tempsChargement }, function (err, result) {
        console.log(result);

        // convertir en minutes
        var heures = Math.floor(result.temps);
        var minutes = Math.round((result.temps - heures) * 60);
        if (heures == 0) {
          var temps = minutes + " minutes";
        }
        else {
          var temps = heures + " heures " + minutes + " minutes";
        }

        setTemps(temps);
      });
    }
    );
  }


  return (
    <>
      <div className="App">
        <h1 className="title">Voyage APP</h1>
        <div class="destination">
          <div className="depart">
            <label>Départ </label>
          <input type="text" name="distance" value={ville_depart} onChange={handleVille_departChange} placeholder="km" />
            <p class="gps1">{gps1[0]} {gps1[1]}</p>
          </div>
          <div className="switch">
            <button type="button" onClick={switchVilles}>←→</button>
          </div>
          <div className="arrive">
            <label>Arrivée </label>
          <input type="text" name="distance" value={ville_arrivee} onChange={handleVille_arriveeChange} placeholder="km" />
            <p class="gps2">{gps2[0]} {gps2[1]}</p>
            </div>
        
        </div>
        

        <div class="container">
        <div className="divform">
            <form>
          <label>Distance </label>
          <input type="number" name="distance" value={distance} onChange={handleDistanceChange} placeholder="km"/>
          <label>Autonomie</label>
          <input type="number" name="autonomie" value={autonomie} onChange={handleAutonomieChange} placeholder="km" />
          <label>Chargement</label>
          <input type="number" name="chargement" value={tempsChargement} onChange={handleTempsChargementChange} placeholder="min." />
          <button type="button" onClick={sendRequest}>Calculer</button>
            </form>
          <div className="divtemps">
          <p>Temps de voyage : {temps}</p>
        </div>
        </div>
        {/* <div className="map" id="map"> */}
              {/* <img className="imgmap" src="https://as1.ftcdn.net/v2/jpg/02/25/77/30/1000_F_225773013_7VnI8Q20BuedFagxj2xvAcYNBTO5QhbN.jpg" alt="placeholder" /> */}
          {/* </div> */}
          </div>

      </div>
    </>
      
    
  );
}

export default App;
