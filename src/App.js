import './css/App.css';
import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import StartEndComponent from './components/Header/StartEndComponent';
import Map from './components/Map';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';
import { vehicleListQuery } from './services/vehiculeListService';
import { client } from './services/vehiculeListService';
import SideBar from './components/SideBar/SideBar';
import Header from "./components/Header/Header"



function App() {
  
  var gps1 = useSelector((state) => state.datas.gps_depart);
  var gps2 = useSelector((state) => state.datas.gps_arrivee);
  
  var [borneDepart, setBorneDepart] = useState(null);


  const dispatch = useDispatch();

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

        </div>
        <SideBar />
      </>
      </ApolloProvider>
    
  );
}

export default App;
