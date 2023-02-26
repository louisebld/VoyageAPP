import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDistance, setAutonomie, setTempsChargement, setTemps } from "../store/datas";
var soap = require('soap-everywhere');

function FormTimeComponent() {

    const dispatch = useDispatch();

    var distance = useSelector((state) => state.datas.distance);
    var autonomie = useSelector((state) => state.datas.autonomie);
    var tempsChargement = useSelector((state) => state.datas.tempsChargement);
    var temps = useSelector((state) => state.datas.temps);


  const handleDistanceChange = (event) => {
  dispatch(setDistance(event.target.value));
}


// Fonction pour mettre à jour la valeur d'autonomie
const handleAutonomieChange = (event) => {
  dispatch(setAutonomie(event.target.value));
}

// Fonction pour mettre à jour la valeur de temps de chargement
const handleTempsChargementChange = (event) => {
  dispatch(setTempsChargement(event.target.value));
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
                dispatch(setTemps(temps));
            });
        }
        );
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
          <button type="button" onClick={sendRequest}>Calculer</button>
            </form>
          <div className="divtemps">
          <p>Temps de voyage : {temps}</p>
            </div>
        </div>
    );
    }


export default FormTimeComponent;