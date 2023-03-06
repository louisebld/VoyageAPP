import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../css/Carrousel.css";
import {vehiculeList} from '../assets/vehiculelist.js'

const Carrousel = () => {

    const cars = vehiculeList;
    
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const goToPreviousCar = () => {
    if (currentCarIndex === 0) {
      setCurrentCarIndex(cars.vehicleList.length - 1);
    } else {
      setCurrentCarIndex(currentCarIndex - 1);
    }
  };

  const goToNextCar = () => {
    if (currentCarIndex === cars.vehicleList.length - 1) {
      setCurrentCarIndex(0);
    } else {
      setCurrentCarIndex(currentCarIndex + 1);
    }
    };
    
  return (
    <div>
        <h2>{cars.vehicleList[currentCarIndex].naming.make}</h2>
        <h2>{cars.vehicleList[currentCarIndex].naming.model}</h2>
        <h2>{cars.vehicleList[currentCarIndex].naming.chargetrip_version}</h2>
        <img src={cars.vehicleList[currentCarIndex].media.image.thumbnail_url} alt="car" />
        <div>
            <FaArrowAltCircleLeft onClick={goToPreviousCar} className="icon"/>
            <FaArrowAltCircleRight onClick={goToNextCar} className="icon"/>
        </div>
    </div>
);
};

export default Carrousel;


