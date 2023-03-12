import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDistance, setAutonomie, setTempsChargement, setTemps } from "../../store/datas";
import sendSoapRequest from '../../services/soapService';
import '../../css/FormTimeComponent.css'
import coutCalcul from '../../services/coutService';
var soap = require('soap-everywhere');


function FormTimeComponent() {

    const dispatch = useDispatch();

    var distance = useSelector((state) => state.datas.distance);
    var autonomie = useSelector((state) => state.datas.autonomie);
    var tempsChargement = useSelector((state) => state.datas.tempsChargement);
  var temps = useSelector((state) => state.datas.temps);
  
  var cout = useSelector((state) => state.datas.cout);
    
  // const callAPI = () => {
  //   fetch('https://api-louisebld.vercel.app/calculer-cout/' + distance).then(response => {
  //       return response.json();
  //   }).then(data => {
  //       setCout(data.cout)
  //   });
  // }
  


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
          <div className="divInput">
            <input type="number" name="distance" value={distance} onChange={handleDistanceChange} placeholder="km" />
            <p className="text">km.</p>
            </div>
          <label>Autonomie</label>
          <div className="divInput">
            <input type="number" name="autonomie" value={autonomie} onChange={handleAutonomieChange} placeholder="km" />
            <p className="text">km.</p>
            </div>
          <label>Chargement</label>
          <div className="divInput">
          <input type="number" name="chargement" value={tempsChargement} onChange={handleTempsChargementChange} placeholder="min." />
            <p className="text">mn.</p>
            </div>

          {/* <button type="button" onClick={callSoap}>Calculer</button> */}
            </form>
          <div className="divtemps">
            <p className="">Temps : {formatTemps(temps)}</p>
            <p className="">Coût : {cout}€</p>
          </div>

        

        </div>
    );
    }


export default FormTimeComponent;