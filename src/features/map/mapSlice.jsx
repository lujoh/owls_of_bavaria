import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {webmap, view, background} from './loadMap';
import { loadOwlFeatureLayer } from './loadOwlFeatureLayer';


export const initializeMap = createAsyncThunk('map/initializeMap', async (container) => {
  view.container = container;
  webmap.add(background);
  return view.when(() =>{
  })

})

export const addOwlLayer = createAsyncThunk('map/addOwlLayer', async (_, {getState}) => {
  const data = getState().owl;
  return loadOwlFeatureLayer(data, webmap);
})


export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    baseLoaded: "not loaded",
    owlLayerLoaded: "not loaded",
    error: ""
  },
  reducers: {
    
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
    .addCase(addOwlLayer.fulfilled, (state) => {
      state.owlLayerLoaded = "loaded";
    })
    .addCase(addOwlLayer.rejected, (state, action) => {
      state.owlLayerLoaded = "error";
      state.error = action.error.message;
    })
    .addCase(addOwlLayer.pending, (state => {
      state.owlLayerLoaded = "pending";
    }))
  }
});



export default mapSlice.reducer;

export const selectMapStatus = state => state.map.baseLoaded;

export const selectOwlLayerStatus = state => state.map.owlLayerLoaded;