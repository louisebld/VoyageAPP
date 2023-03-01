import React from "react";
import { useSelector, useDispatch } from "react-redux";
import askGPSVille from "../services/gpsservice";
import { MdPlace } from 'react-icons/md';
import {HiOutlineSwitchHorizontal} from 'react-icons/hi';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../store/datas";
import {addMarker, setBounds} from '../store/map';
import L from 'leaflet';
import DepartInput from "./DepartInput";
import ArriveInput from "./ArriveInput";

function StartEndComponent() {

    var ville_depart = useSelector((state) => state.datas.depart);
    var ville_arrivee = useSelector((state) => state.datas.arrivee);
    var gps1 = useSelector((state) => state.datas.gps_depart);
  var gps2 = useSelector((state) => state.datas.gps_arrivee);
  
  // var markers = useSelector((state) => state.map.markers);
  // var bounds = useSelector((state) => state.map.bounds);

    const dispatch = useDispatch();


    const switchVilles = () => {
        dispatch(setVille_depart(ville_arrivee));
        dispatch(setVille_arrivee(ville_depart));
    }

  const handleVille_departChange = (event) => {
    dispatch(setVille_depart(event.target.value));
    // askGPSVille(ville_depart).then((result) => {
    //   dispatch(setGps_depart(result));
    // });
    // dispatch(setDistance(calculDistance()));
  }
  

  const handleVille_arriveeChange = (event) => {
    dispatch(setVille_arrivee(event.target.value));
    // askGPSVille(ville_arrivee).then((result) => {
    //   dispatch(setGps_arrivee(result));
    // });
    // dispatch(setDistance(calculDistance()));
  }

  function calculDistance() {
    var lat1 = gps1[0];
    var lon1 = gps1[1];
    var lat2 = gps2[0];
    var lon2 = gps2[1];

    const R = 6371; // Rayon de la terre en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    distance = Math.round(distance * 100) / 100;
    return distance;
  }

  function chercher() {

    askGPSVille(ville_depart).then((result) => {
      console.log(result)
      console.log(result[0])
      dispatch(setGps_depart(result));
      var marker = [result];
      dispatch(addMarker(marker));
      // setBounds(marker)
    });

    // askGPSVille(ville_arrivee).then((result) => {
    //   dispatch(setGps_arrivee(result));
    // });

    // var marker2 = [gps2[0], gps2[1]];
    // dispatch(addMarker(marker));
    // dispatch(addMarker(marker2));

  }
  
  return (
    <div className="destination">
      <button onClick={chercher}>Chercher</button>
      <div className="depart">
                {/* <MdPlace/> */}
        <label>Départ</label>
        {/* <input type="text" name="depart" onChange={handleVille_departChange} placeholder="Ville" /> */}
          <DepartInput/>
              {/* <p className="gps1">{gps1[0]} {gps1[1]}</p> */}
          </div>
          <div className="switch">
            <button type="button" onClick={switchVilles}><HiOutlineSwitchHorizontal/></button>
          </div>
          <div className="arrive">
            <label>Arrivée </label>
        {/* <input type="text" name="arrive" onChange={handleVille_arriveeChange}  placeholder="Ville" /> */}
        <ArriveInput/>
      
      </div>
        
        </div>
  );
}

export default StartEndComponent;