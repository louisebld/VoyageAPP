import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../store/datas";

import '../css/input.css';
import askGPSVille from '../services/gpsservice';

function CityInput() {

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

  return (
    <div className="city-input-container">
      <input type="text" className="city-input" value={ville_depart} onChange={handleInputChange} />
      {suggestions.length > 0 && (
        <ul className="city-suggestions">
          {suggestions.map((city) => (
            <li key={city.name} className="city-suggestion" onClick={() => handleSuggestionClick(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityInput;