import { configureStore } from "@reduxjs/toolkit";
import Slice from "./slice.tsx";

const store = configureStore({
  reducer: {
    slice: Slice.reducer,
  },
});

export default store;
