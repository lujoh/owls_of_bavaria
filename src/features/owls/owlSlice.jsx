import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getOwls } from './getOwls';

export const getOwlData = createAsyncThunk('owls/getOwlData', async (_, {getState}) => {
    return getOwls(selectOwlData(getState()));
})

export const owlSlice = createSlice({
    name: 'owl',
    initialState: {
        owls: {},
        taxaById: {},
        taxaList: [],
        years: {
            min: new Date().getFullYear(),
            max: new Date().getFullYear()
        },
        status: 'not loaded',
        error: ''
    },
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(getOwlData.fulfilled, (state, action) => {
                state.owls = action.payload.owls;
                state.taxaById = action.payload.taxaById;
                state.taxaList = action.payload.taxaList;
                state.status = "loaded";
                state.years = action.payload.years
            })
            .addCase(getOwlData.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
    }
});

export default owlSlice.reducer;

export const selectOwlData = state => state.owl;

export const selectOwls = state => state.owl.owls;

export const selectTaxa = state => state.owl.taxaList;

export const selectTaxaById = (state, taxonId) => state.owl.taxaById[taxonId];

export const selectOwlStatus = state => state.owl.status;

export const selectYears = state => state.owl.years;