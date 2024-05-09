import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: { lat: 40.7678, lng: -73.9645 }, //coords to hunter
  },
  reducers: {
    setLat: (state, action) => {

      state.value.lat = action.payload;
    },
    setLng: (state, action) => {
      state.value.lng = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setLat, setLng } = locationSlice.actions;

export default locationSlice.reducer;
