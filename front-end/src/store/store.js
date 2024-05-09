import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/locationSlice.js";
import mapSlice from "./slices/mapSlice.js";

export default configureStore({
  reducer: {
    location: locationSlice,
    map: mapSlice,
  },
  //the following code is from 
  //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  //due to an error i was having with one of the slices
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
