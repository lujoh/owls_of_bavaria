import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {webmap, view, background, owlFeatureLayer} from './loadMap';
import { loadOwlFeatureLayer } from './loadOwlFeatureLayer';
import { loadFilterEffect } from './filterOwlLayer';


export const initializeMap = createAsyncThunk('map/initializeMap', async (container) => {
  view.container = container;
  webmap.add(background);
  return view.when(() =>{
  })

})

export const addOwlLayer = createAsyncThunk('map/addOwlLayer', async (_, {getState}) => {
  const data = getState().owl;
  return loadOwlFeatureLayer(data, webmap, owlFeatureLayer);
})

export const filterOwlLayer = createAsyncThunk('map/filterOwls', async (filters, {getState, rejectWithValue, fulfillWithValue}) => {
  if (!getState().owlLayerLoaded == "loaded"){
    return rejectWithValue(filters)
  }
  loadFilterEffect(owlFeatureLayer, filters);
  return fulfillWithValue(filters);
})


export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    baseLoaded: "not loaded",
    owlLayerLoaded: "not loaded",
    error: "",
    filterStatus: "not loaded",
    filters: {}
  },
  reducers: {
    
  },
  extraReducers(builder){
    builder
      .addCase(initializeMap.fulfilled, (state) => {
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
    .addCase(filterOwlLayer.rejected, (state, action) => {
      state.filterStatus = "error";
      state.currentFilters = action.payload
    })
  }
});



export default mapSlice.reducer;

export const selectMapStatus = state => state.map.baseLoaded;

export const selectOwlLayerStatus = state => state.map.owlLayerLoaded;