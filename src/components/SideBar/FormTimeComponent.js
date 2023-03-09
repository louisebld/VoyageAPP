import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDistance, setAutonomie, setTempsChargement, setTemps } from "../../store/datas";
import sendSoapRequest from '../../services/soapservice';
import '../../css/FormTimeComponent.css'
import coutCalcul from '../../services/coutService';
var soap = require('soap-everywhere');


function FormTimeComponent() {

    const dispatch = useDispatch();

    var distance = useSelector((state) => state.datas.distance);
    var autonomie = useSelector((state) => state.datas.autonomie);
    var tempsChargement = useSelector((state) => state.datas.tempsChargement);
  var temps = useSelector((state) => state.datas.temps);
  
  var [cout, setCout] = useState(0);
  
  const callAPI = () => {
    fetch('http://localhost:8081/calculer-cout/' + distance).then(response => {
        return response.json();
    }).then(data => {
        setCout(data.cout)
    });
  }
  

  const callSoap = () => {
    sendSoapRequest(distance, autonomie, tempsChargement).then((result) => {
      dispatch(setTemps(result));
    });
  }

  function formatTemps(temps) {
    const heures = Math.floor(temps / 60);
    const minutes = temps % 60;
    return `${heures}h${minutes < 10 ? '0' : ''}${minutes}`;
}
  
    const handleDistanceChange = (event) => {
    dispatch(setDistance(event.target.value));
  }
  const handleAutonomieChange = (event) => {
    dispatch(setAutonomie(event.target.value));
  }
  const handleTempsChargementChange = (event) => {
    dispatch(setTempsChargement(event.target.value));
    }

    return (
        <div className="divform">
            <form>
          <label>Distance </label>
          <input type="number" name="distance" value={distance} onChange={handleDistanceChange} placeholder="km"/>
          <label>Autonomie</label>
          <input type="number" name="autonomie" value={autonomie} onChange={handleAutonomieChange} placeholder="km" />
          <label>Chargement</label>
          <input type="number" name="chargement" value={tempsChargement} onChange={handleTempsChargementChange} placeholder="min." />
          <button type="button" onClick={callSoap}>Calculer</button>
            </form>
          <div className="divtemps">
          <p>Temps de voyage : {formatTemps(temps)}</p>
          <button type="button" onClick={callAPI}>Calculer</button>
          <p>Cout du voyage : {cout}€</p>
        </div>

        

        </div>
    );
    }


export default FormTimeComponent;