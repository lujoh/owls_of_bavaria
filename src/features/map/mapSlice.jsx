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

export const applyFilters = createAsyncThunk('map/applyFilters', async (filter, {getState, rejectWithValue, fulfillWithValue}) => {
  const filters_prev = getState().map.filters;
  const filters_new = {
    species: "species" in filter ? filter.species : filters_prev.species,
    obscured: "obscured" in filter ? filter.obscured : filters_prev.obscured,
    year: "year" in filter ? filter.year : filters_prev.year
  }
  if (!getState().owlLayerLoaded == "loaded"){
    return rejectWithValue(filters_new)
  }
  loadFilterEffect(owlFeatureLayer, filters_new);
  return fulfillWithValue(filters_new);
})

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    baseLoaded: "not loaded",
    owlLayerLoaded: "not loaded",
    error: "",
    filterStatus: "not loaded",
    filters: {
      species: null,
      obscured: false,
      year: null
    }
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
    .addCase(applyFilters.rejected, (state, action) => {
      state.filterStatus = "error";
      state.filters = action.payload;
    })
    .addCase(applyFilters.fulfilled, (state, action) => {
      state.filterStatus = "success";
      state.filters = action.payload;
    })
  }
});



export default mapSlice.reducer;

export const selectMapStatus = state => state.map.baseLoaded;

export const selectOwlLayerStatus = state => state.map.owlLayerLoaded;

export const selectCurrentSpeciesFilter = state =>state.map.filters.species;

export const selectCurrentFilters = state => state.map.filters