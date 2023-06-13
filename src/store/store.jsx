import { configureStore} from '@reduxjs/toolkit';
// import reducers
import mapReducer from '../features/map/mapSlice';
import owlReducer from '../features/owls/owlSlice';

export default configureStore({
  reducer: {
    map: mapReducer,
    owl: owlReducer
  }
})