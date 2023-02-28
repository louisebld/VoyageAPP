import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  depart: "",
  arrivee: "",
  gps_depart: [45.564601, 5.917781],
  gps_arrivee: [],
  distance: 0,
  autonomie: 0,
  tempsChargement: 0,
  temps: 0,  
};


export const datasSlice = createSlice({
  name: "datas",
  initialState,

  reducers: {
    setVille_depart: (state, action) => {
      state.depart = action.payload;
    }
    ,
    setVille_arrivee: (state, action) => {
      state.arrivee = action.payload;
    }
    ,
    setGps_depart: (state, action) => {
      state.gps_depart = action.payload;
    }
    ,
    setGps_arrivee: (state, action) => {
      state.gps_arrivee = action.payload;
    }
    ,
    setDistance: (state, action) => {
      state.distance = action.payload;
    }
    ,
    setAutonomie: (state, action) => {
      state.autonomie = action.payload;
    }
    ,
    setTempsChargement: (state, action) => {
      state.tempsChargement = action.payload;
    },
    setTemps: (state, action) => {
      state.temps = action.payload;
    }
    ,
  },
});

// Action creators are generated for each case reducer function
export const { setVille_depart, setVille_arrivee, setGps_depart, setGps_arrivee, setDistance, setAutonomie, setTempsChargement, setTemps } =
  datasSlice.actions;

export default datasSlice.reducer;
