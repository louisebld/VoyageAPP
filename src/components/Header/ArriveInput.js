import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance } from "../../store/datas";
import askGPSVille from '../../services/gpsService';
import '../../css/InputComponent.css';
import _ from 'lodash';
import { debounce } from 'lodash';

function CityInput() {

    const dispatch = useDispatch();
    var ville_arrivee = useSelector((state) => state.datas.arrivee);

    const [searchTerm, setSearchTerm] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(0);

  
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
      <input type="text" className="city-input" value={searchTerm} onChange={handleSearchInputChange} placeholder="Arrivée"/>
      {suggestions.length > 0 && (
        <ul className="city-suggestions-arrive">
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