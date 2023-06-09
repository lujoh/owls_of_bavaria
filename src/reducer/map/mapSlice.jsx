import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    baseLoaded: "not loaded",
    owlLayerLoaded: "not loaded"
  },
  reducers: {
    loadMap: state => {
      state.baseLoaded = "loaded"
    },
    addOwlLayer: state => {
      state.owlLayerLoaded = "loaded"
    }
  }
})

export const { loadMap, addOwlLayer } = mapSlice.actions

export default mapSlice.reducer

export const selectMapStatus = state => state.mapStatus.value