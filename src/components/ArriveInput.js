import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../store/datas";
import askGPSVille from '../services/gpsservice';
import '../css/input.css';

function CityInput() {

    const dispatch = useDispatch();
    var ville_arrivee = useSelector((state) => state.datas.arrivee);
 
    const [suggestions, setSuggestions] = useState([]);

  async function handleInputChange(event) {
    const value = event.target.value;
    dispatch(setVille_arrivee(value));

    
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
      dispatch(setVille_arrivee(city.name));
      dispatch(setGps_arrivee([city.lat, city.lon]));
      
    setSuggestions([]);
  }

  return (
    <div className="city-input-container">
      <input type="text" className="city-input" value={ville_arrivee} onChange={handleInputChange} />
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