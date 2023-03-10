import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../../css/Carrousel.css";
import { vehiculeList } from '../../assets/vehiculelist.js'

const Carrousel = () => {

  const cars = vehiculeList;
  const [marques, setMarques] = useState([]);

    
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

    const handleMakeChange = (event) => {
    // Get the selected make
    const selectedMake = event.target.value;
    // Find the index of the first car with the selected make
    const index = cars.vehicleList.findIndex(
      (car) => car.naming.make === selectedMake
    );
    setCurrentCarIndex(index);
  };
  
  useEffect(() => {
    const marques = [...new Set(cars.vehicleList.map((car) => car.naming.make))];
    setMarques(marques);
  }, [cars.vehicleList]);
    
  return (

    <div className="vehicules">
      <select className="select" onChange={handleMakeChange} value={cars.vehicleList[currentCarIndex].naming.make}>
        {marques.map((marque, index) => (
          <option key={index} value={marque}>
            {marque}
          </option>
        ))}
      </select>
      <div className="titleCar">
        {cars.vehicleList[currentCarIndex].naming.make} {cars.vehicleList[currentCarIndex].naming.model}
      </div>
          {cars.vehicleList[currentCarIndex].naming.chargetrip_version} <br />
        Autonomie :
        <img className="img_carrousel" src={cars.vehicleList[currentCarIndex].media.image.thumbnail_url} alt="car" />
        <div>
            <FaArrowAltCircleLeft onClick={goToPreviousCar} className="icon"/>
        <FaArrowAltCircleRight onClick={goToNextCar} className="icon" />
        </div>
        <button>Choisir</button>

    </div>
);
};

export default Carrousel;


