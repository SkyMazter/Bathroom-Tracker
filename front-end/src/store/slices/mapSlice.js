import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    map: null, //null unitl i store map
  },
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMap } = mapSlice.actions;

export default mapSlice.reducer;
