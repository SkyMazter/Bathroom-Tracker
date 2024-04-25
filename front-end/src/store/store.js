import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/locationSlice.js";

export default configureStore({
  reducer: {
    location: locationSlice,
  },
});
