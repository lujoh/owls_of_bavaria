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

export const filterOwlLayerBySpecies = createAsyncThunk('map/filterOwlLayerBySpecies', async (speciesId, {getState, rejectWithValue, fulfillWithValue}) => {
  let filters = {...getState().map.filters, species: speciesId}
  if (!getState().owlLayerLoaded == "loaded"){
    return rejectWithValue(filters)
  }
  loadFilterEffect(owlFeatureLayer, filters);
  return fulfillWithValue(filters);
})

export const filterObscuredSpecies = createAsyncThunk('map/filterObscuredSpecies', async (obscured, {getState, rejectWithValue, fulfillWithValue}) => {
  let filters = {...getState().map.filters, obscured: obscured}
  if (!getState().owlLayerLoaded == "loaded"){
    return rejectWithValue(filters)
  }
  loadFilterEffect(owlFeatureLayer, filters);
  return fulfillWithValue(filters);
})

export const filterOwlLayerByYear = createAsyncThunk('map/filterOwlLayerByYear', async (year, {getState, rejectWithValue, fulfillWithValue}) => {
  let filters = {...getState().map.filters,
  year: year};
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
    .addCase(filterOwlLayerBySpecies.rejected, (state, action) => {
      state.filterStatus = "error";
      state.filters = action.payload;
    })
    .addCase(filterOwlLayerBySpecies.fulfilled, (state, action) => {
      state.filterStatus = "success";
      state.filters = action.payload;
    })
    .addCase(filterObscuredSpecies.rejected, (state, action) => {
      state.filterStatus = "error";
      state.filters = action.payload;
    })
    .addCase(filterObscuredSpecies.fulfilled, (state, action) => {
      state.filterStatus = "success";
      state.filters = action.payload;
    })
    .addCase(filterOwlLayerByYear.rejected, (state, action) => {
      state.filterStatus = "error";
      state.filters = action.payload;
    })
    .addCase(filterOwlLayerByYear.fulfilled, (state, action) => {
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