import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../../store/datas";

import '../../css/InputComponent.css';
import askGPSVille from '../../services/gpsService';

function CityInput() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(0);

    const dispatch = useDispatch();
    var ville_depart = useSelector((state) => state.datas.depart);
    const [suggestions, setSuggestions] = useState([]);

  async function handleInputChange(event) {
    const value = event.target.value;
    dispatch(setVille_depart(value));

    askGPSVille(value).then((data) => {
      console.log("data", data)
      const citySuggestions = data.map((city) => ({
        name: city.display_name,
        lat: city.lat,
        lon: city.lon,
      }));
      setSuggestions(citySuggestions);

    });
  }

  function handleSuggestionClick(city) {
      dispatch(setVille_depart(city.name));
      dispatch(setGps_depart([city.lat, city.lon]));
    setSuggestions([]);
  }

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => {
      handleInputChange(event);
    }, 600));
  setSearchTerm(value);
};


  return (
    <>
    {/* <div className="city-input-container"> */}
      <input type="text" className="city-input" value={searchTerm} onChange={handleSearchInputChange} placeholder="Départ"/>
      {suggestions.length > 0 && (
        <ul className="city-suggestions">
          {suggestions.map((city) => (
            <li key={city.name} className="city-suggestion" onClick={() => handleSuggestionClick(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
      {/* </div> */}
      </>
  );
}

export default CityInput;