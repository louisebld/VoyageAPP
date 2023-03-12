import React from "react";
import { useSelector, useDispatch } from "react-redux";
import askGPSVille from "../../services/gpsService";
import { MdPlace } from 'react-icons/md';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { TbMapSearch } from 'react-icons/tb';
import {FcSearch} from 'react-icons/fc';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance, setCout, setTemps } from "../../store/datas";
import {addMarker, setBounds, setDepart, setArrive} from '../../store/map';
import L from 'leaflet';
import DepartInput from "./DepartInput";
import ArriveInput from "./ArriveInput";
import '../../css/StartEndComponent.css';
import { calculDistance } from "../../functions/calculDistance";
import coutCalcul from "../../services/coutService";
import sendSoapRequest  from "../../services/soapService";


function StartEndComponent() {

  var ville_depart = useSelector((state) => state.datas.depart);
  var ville_arrivee = useSelector((state) => state.datas.arrivee);
  var gps1 = useSelector((state) => state.datas.gps_depart);
  var gps2 = useSelector((state) => state.datas.gps_arrivee);

  var [dist, setDist] = React.useState(0);

  var autonomie = useSelector((state) => state.datas.autonomie);
  var tempsChargement = useSelector((state) => state.datas.tempsChargement);

  
  // var markers = useSelector((state) => state.map.markers);
  // var bounds = useSelector((state) => state.map.bounds);

    const dispatch = useDispatch();


    const switchVilles = () => {
        dispatch(setVille_depart(ville_arrivee));
        dispatch(setVille_arrivee(ville_depart));
    }

  function distance() {
    var lat1 = gps1[0];
    var lon1 = gps1[1];
    var lat2 = gps2[0];
    var lon2 = gps2[1];

    return Math.round(calculDistance(lat1, lon1, lat2, lon2));
  }

  const callCoutApi = () => {
    coutCalcul(distance()).then((result) => {
      console.log("result", result)
      dispatch(setCout(result));
    });
  }

  const callSoap = () => {
    sendSoapRequest(distance(), autonomie, tempsChargement).then((result) => {
      dispatch(setTemps(result));
    });
  }

  function chercher() {

    console.log("distance : " + distance());
    dispatch(setDistance(distance()));
    callCoutApi();
    callSoap();
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