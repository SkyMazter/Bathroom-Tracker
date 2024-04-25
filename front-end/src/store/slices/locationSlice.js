import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: { lat: 40.7678, lng: -73.9645 }, //coords to hunter
  },
  reducers: {
    setLat: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value.lat = action.payload;
    },
    setLng: (state) => {
      state.value.lng = action.payload;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setLat, setLng } = locationSlice.actions;

export default locationSlice.reducer;
