import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocation = createAsyncThunk(
  "weatherapp/fetchedLocation",
  async (location) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}${location}&appid=${process.env.REACT_APP_APPID}&units=${process.env.REACT_APP_UNIT}`
    );
    return response.data;
  }
);

const Slice = createSlice({
  name: "slice",
  initialState: {
    status: "idle",
    location: "",
    result: null,
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        // @ts-ignore
        state.status = "failed";
        // @ts-ignore
        state.result = null;
        // @ts-ignore

        state.error = "Not found";
      });
  },
});

export const Action = Slice.actions;
export default Slice;
