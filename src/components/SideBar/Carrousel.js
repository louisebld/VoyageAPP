import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../../css/Carrousel.css";
import { vehiculeList } from '../../assets/vehiculelist.js'
import {setAutonomie, setTempsChargement } from "../../store/datas";

import { client, vehicleListQuery } from '../../services/vehiculeListService'
import { useSelector, useDispatch } from "react-redux";

const Carrousel = () => {


  const [cars, setCars] = useState([]);
  const [marques, setMarques] = useState([]);

  const dispatch = useDispatch();
    
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const goToPreviousCar = () => {
    if (currentCarIndex === 0) {
      setCurrentCarIndex(cars.length - 1);
    } else {
      setCurrentCarIndex(currentCarIndex - 1);
    }
  };


  const goToNextCar = () => {
    
    if (currentCarIndex === cars.length - 1) {
      setCurrentCarIndex(0);
    } else {
      setCurrentCarIndex(currentCarIndex + 1);
    }
  };

    const handleMakeChange = (event) => {
    // Get the selected make
    const selectedMake = event.target.value;
    // Find the index of the first car with the selected make
    const index = cars.findIndex(
      (car) => car.naming.make === selectedMake
    );
    setCurrentCarIndex(index);
  };
  
  // useEffect(() => {
  //   const marques = [...new Set(cars.vehicleList.map((car) => car.naming.make))];
  //   setMarques(marques);
  // }, [cars.vehicleList]);
    
  useEffect(() => {
    client.query(vehicleListQuery, { page: 10, size: 80, search: "" }).toPromise().then((result) => {
      // console.log(result.data)

      var voitures = []
      var cars = result.data

      for (let i = 0; i < cars.vehicleList.length; i++) {
        var voiture = cars.vehicleList[i]
        // console.log(voiture)

        if (voiture !== null && voiture) {
          voitures.push(cars.vehicleList[i])
        }
      }
      // console.log(voitures)
      setCars(voitures)

      const marques = [...new Set(voitures.map((car) => car.naming.make))];
      setMarques(marques);

      });
}, []);


  const choisirVehicule = () => {
    var taille = cars[currentCarIndex].connectors.length
    dispatch(setAutonomie(cars[currentCarIndex].range.chargetrip_range.best))
    dispatch(setTempsChargement(cars[currentCarIndex].connectors[taille - 1].time))
  }

  if (cars.length === 0 && marques.length === 0) {
    return <div>Loading...</div>;
  }

  return (


    <div className="vehicules">
      <select className="select" onChange={handleMakeChange} value={cars[currentCarIndex].naming.make}>
        {marques.map((marque, index) => (
          <option key={index} value={marque}>
            {marque}
          </option>
        ))}
      </select>
      <div className="titleCar">
        {cars[currentCarIndex].naming.make} {cars[currentCarIndex].naming.model}
      </div>
      <div className="version">
        {cars[currentCarIndex].naming.chargetrip_version} <br />
        <div className={cars[currentCarIndex].range.chargetrip_range.best > 200 ? "goodautonomie" : "badautonomie"}>
          Autonomie : {cars[currentCarIndex].range.chargetrip_range.best} km
        </div>
        </div>
        <img className="img_carrousel" src={cars[currentCarIndex].media.image.thumbnail_url} alt="car" />
        <div className="arrow">
            <FaArrowAltCircleLeft onClick={goToPreviousCar} className="icon"/>
        <FaArrowAltCircleRight onClick={goToNextCar} className="icon" />
                <button onClick={choisirVehicule}>Choisir</button>
        </div>

    </div>
);
};

export default Carrousel;


