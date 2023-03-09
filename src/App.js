import './css/App.css';
import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import StartEndComponent from './components/Header/StartEndComponent';
import findBorne from './services/bornesservice';
import Map from './components/Map';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import List from './components/list';
import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';
import { vehicleListQuery } from './services/vehiculeListService';
import { client } from './services/vehiculeListService';
import SideBar from './components/SideBar/SideBar';
import Header from "./components/Header/Header"
// import Nav from './components/Nav';
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
          <Header/>
        <div className="container">

        <div className="map" id="map">
              <Map/>
            </div>

          </div>
          {/* <p>{borneDepart}</p> */}
          {/* <List/> */}

        {/* <button>Search</button> */}
        </div>
        <SideBar />
      </>
      </ApolloProvider>
    
  );
}

export default App;
