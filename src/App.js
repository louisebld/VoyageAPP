import './css/App.css';
import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import StartEndComponent from './components/StartEndComponent';
import FormTimeComponent from './components/FormTimeComponent';
import findBorne from './services/bornesservice';
import van from './assets/van.png';
import Map from './components/Map';
import CityInput from './components/DepartInput';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import List from './components/list';
import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';
import { vehicleListQuery } from './services/vehiculeListService';
import { client } from './services/vehiculeListService';

const soap = require('soap-everywhere');
// include OpenLayers
var ol = require('openlayers');



// function test() {
//   client.query(vehicleListQuery, { page: 10, size: 10, search: "" }).toPromise().then((result) => {
//     console.log(result);
//   });
// }



function App() {
  
  var gps1 = useSelector((state) => state.datas.gps_depart);
  var gps2 = useSelector((state) => state.datas.gps_arrivee);
  
  var [borneDepart, setBorneDepart] = useState(null);


  const dispatch = useDispatch();
  
  const callBorne = () => {
    // console.log(gps1, gps2)
    findBorne(gps1[0], gps1[1]).then((result) => {
      console.log("borne :", result)
      setBorneDepart(result.ad_station);
    });
  }

  return (
    <ApolloProvider client={client}>
    <>
      <div className="App">
        <div className="header">
        <div className="titleGroup">
          <img className="van" src={van} alt="placeholder" />
          <h1 className="title">PLANIFIE TON VOYAGE</h1>
        </div>
        {/* <p className="parag">Planifie ton voyage</p> */}
          <StartEndComponent />        
        </div>
        <div className="container">
          {/* <FormTimeComponent/> */}

        <div className="map" id="map">
              <Map/>
          </div>
          </div>
          <p>{borneDepart}</p>
          <List/>

        <button>Search</button>
        </div>

      </>
      </ApolloProvider>
    
  );
}

export default App;
