import React from "react";
import { useSelector, useDispatch } from "react-redux";
import askGPSVille from "../../services/gpsservice";
import { MdPlace } from 'react-icons/md';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { TbMapSearch } from 'react-icons/tb';
import {FcSearch} from 'react-icons/fc';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../../store/datas";
import {addMarker, setBounds, setDepart, setArrive} from '../../store/map';
import L from 'leaflet';
import DepartInput from "./DepartInput";
import ArriveInput from "./ArriveInput";
import '../../css/StartEndComponent.css';
import { calculDistance } from "../../functions/calculDistance";
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

  function distance() {
    var lat1 = gps1[0];
    var lon1 = gps1[1];
    var lat2 = gps2[0];
    var lon2 = gps2[1];

    calculDistance(lat1, lon1, lat2, lon2)
  }

  function chercher() {

    dispatch(setDistance(distance()));
    dispatch(setDepart(gps1))
    dispatch(setArrive(gps2))

    dispatch(addMarker(gps1)) 
    dispatch(addMarker(gps2))


  }
  
  return (
    <div className="destination">
          <DepartInput/>
            <button type="button" onClick={switchVilles}><HiOutlineSwitchHorizontal/></button>
        <ArriveInput/>
            <button onClick={chercher}><FcSearch/></button>

        
        </div>
  );
}

export default StartEndComponent;