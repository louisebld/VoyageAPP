import './App.css';
import React, { useState } from 'react';
const soap = require('soap-everywhere');

function App() {
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
        <div className="map">
              <img className="imgmap" src="https://as1.ftcdn.net/v2/jpg/02/25/77/30/1000_F_225773013_7VnI8Q20BuedFagxj2xvAcYNBTO5QhbN.jpg" alt="placeholder" />
          </div>
          </div>

      </div>
    </>
      
    
  );
}

export default App;
