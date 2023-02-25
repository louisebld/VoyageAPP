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
        setTemps(result.temps);
      });
    }
    );
  }


  return (
    <>
      <div className="App">
        <h1 className="title">Voyage APP</h1>
        <div className="divform">
        <form>
          <label>Distance</label>
          <input type="number" name="distance" value={distance} onChange={handleDistanceChange}/>
          <label>Autonomie</label>
          <input type="number" name="autonomie" value={autonomie} onChange={handleAutonomieChange} />
          <label>Chargement</label>
          <input type="number" name="chargement" value={tempsChargement} onChange={handleTempsChargementChange} />
          <button type="button" onClick={sendRequest}>Calculer</button>
        </form>
        </div>
        <div className="divtemps">
          <p>Temps de voyage : {temps} heures</p>
        </div>
      </div>
    </>
      
    
  );
}

export default App;
