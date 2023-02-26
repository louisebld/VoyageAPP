import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee } from "../store/datas";

function StartEndComponent() {

    var ville_depart = useSelector((state) => state.datas.depart);
    var ville_arrivee = useSelector((state) => state.datas.arrivee);


    // console.log("ville_depart : ", ville_depart)
    // console.log("ville_arrivee : ", ville_arrivee)
    var gps1 = useSelector((state) => state.datas.gps_depart);
    var gps2 = useSelector((state) => state.datas.gps_arrivee);
    const dispatch = useDispatch();


    const switchVilles = () => {
        dispatch(setVille_depart(ville_arrivee));
        dispatch(setVille_arrivee(ville_depart));
    }

    const handleVille_departChange = (event) => {
        dispatch(setVille_depart(event.target.value));
    // requête pour récupérer la latitude et la longitude de la ville de départ
    fetch('https://api-adresse.data.gouv.fr/search/?q=' + ville_depart)
      .then(response => response.json())
      .then(data => {
        // console.log(data.features[0].geometry.coordinates[0]);
        // console.log(data.features[0].geometry.coordinates[1]);
        // var lat1 = data.features[0].geometry.coordinates[0];
        // var lon1 = data.features[0].geometry.coordinates[1];
          var lat1 = 48.856614;
            var lon1 = 2.3522219;
        setGps_depart([lat1, lon1]);
      })
  }

  const handleVille_arriveeChange = (event) => {
    dispatch(setVille_arrivee(event.target.value));
    // fetch('https://api-adresse.data.gouv.fr/search/?q=' + ville_arrivee)
    //   .then(response => response.json())
    //   .then(data => {
    //     // console.log(data.features[0].geometry.coordinates[0]);
    //     // console.log(data.features[0].geometry.coordinates[1]);
    //     // var lat2 = data.features[0].geometry.coordinates[0];
    //     // var lon2 = data.features[0].geometry.coordinates[1];
    //     // setGps_arrivee([lat2, lon2]);
    //   })
  }


  return (
    <div className="destination">
          <div className="depart">
            <label>Départ</label>
          <input type="text" name="distance" value={ville_depart} onChange={handleVille_departChange} placeholder="km" />
              <p className="gps1">{gps1[0]} {gps1[1]}</p>
          </div>
          <div className="switch">
            <button type="button" onClick={switchVilles}>←→</button>
          </div>
          <div className="arrive">
            <label>Arrivée </label>
          <input type="text" name="distance" value={ville_arrivee} onChange={handleVille_arriveeChange} placeholder="km" />
            <p className="gps2">{gps2[0]} {gps2[1]}</p>
            </div>
        
        </div>
  );
}

export default StartEndComponent;