import { configureStore, applyMiddleware, compose} from '@reduxjs/toolkit';
// import reducers
import mapReducer from '../features/map/mapSlice';
//import middleware

export default configureStore({
  reducer: {
    map: mapReducer,
    // middleware: [mapMiddleWare, ...getDefaultMiddleware()]
  }
})