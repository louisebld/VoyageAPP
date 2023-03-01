import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoom: 10,
  center: [51.505, -0.09],
  depart: [45.564601, 5.917781],
  arrivee: [51.507, -0.12],
  bounds : [[45.564601, 5.917781], [51.507, -0.12]],
  markers: [
    // [45.564601, 5.917781], [45.564601, 5.917781]
  ],
}

export const mapSlice = createSlice({
  name: "map",
  initialState,

  reducers: {
    setZoom: (state, action) => {
      state.zoom = action.payload;
    }
    ,
    setCenter: (state, action) => {
      state.center = action.payload;
    }
    ,
    setDepart: (state, action) => {
      state.depart = action.payload;
    }
    ,
    setArrive: (state, action) => {
      state.arrivee = action.payload;
    }
    ,
    addMarker(state, action) {
      state.markers.push([action.payload[0][1], action.payload[0][0]]);
    },
    
    setBounds: (state, action) => {
      state.bounds = action.payload;
    }


  },
});

// Action creators are generated for each case reducer function
export const { setZoom, setCenter, setDepart, setArrive, addMarker, setBounds  } =
  mapSlice.actions;

export default mapSlice.reducer;
