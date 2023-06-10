import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {webmap, view} from './loadMap';


export const initializeMap = createAsyncThunk('map/initializeMap', async (container, { getState }) => {
  const currentStatus = selectMapStatus(getState())
  view.container = container;
  return view.when(() =>{
  })

})


export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    baseLoaded: "not loaded",
    owlLayerLoaded: "not loaded",
    error: ""
  },
  reducers: {
    addOwlLayer: state => {
      state.owlLayerLoaded = "loaded"
    }
  },
  extraReducers(builder){
    builder
      .addCase(initializeMap.fulfilled, (state, action) => {
      state.baseLoaded = "loaded";
    })
    .addCase(initializeMap.pending, (state) => {
      state.baseLoaded = "pending";
    })
    .addCase(initializeMap.rejected, (state, action) => {
      state.baseLoaded = "error";
      state.error = action.error.message;
    })
  }
})



export const { loadMap, addOwlLayer } = mapSlice.actions

export default mapSlice.reducer

export const selectMapStatus = state => state.map.baseLoaded