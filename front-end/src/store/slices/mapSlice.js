import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    map: null, //null unitl i store map
    markers: [], //an array of objects used to draw markers
    selectedMarker: null,
    isShowingNycMarker: false,
    // singleMarker: {
    //   name: "null",
    //   lat: -1,
    //   lng: -1,
    //   address: "null",
    //   notes: "null",
    //   is_saved: false
    // }
  },
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = action.payload
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
    showNycMarker: (state) => {
      state.isShowingNycMarker = true;
    },
    hideNycMarker: (state) => {
      state.isShowingNycMarker = false;
    },
  },
});

export const { setMap, setMarkers, setSelectedMarker, showNycMarker, hideNycMarker } = mapSlice.actions;

export default mapSlice.reducer;
