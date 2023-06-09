import './MapWindow.css';
import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadMap, addOwlLayer, selectMapStatus} from '../reducer/map/mapSlice';
import {getOwls} from '../data/getOwls';
import {webmap, view, initialize} from '../data/initializeMap';
import { loadOwlFeatureLayer } from '../data/loadOwlFeatureLayer';


function MapWindow() {
  const elementRef = useRef();
  const [owlData, setOwldata] = useState([]);
  const mapStatus = useSelector(state => state.map);
  const dispatch = useDispatch()

  useEffect(() => {
    if (mapStatus.baseLoaded == "not loaded"){
      initialize(elementRef.current);
      dispatch(loadMap());
    }
    console.log(owlData);
    if (owlData && owlData.length > 0 && mapStatus.baseLoaded == "loaded" && mapStatus.owlLayerLoaded == "not loaded"){
      loadOwlFeatureLayer(owlData, webmap);
      dispatch(addOwlLayer());
    } else {
      getOwls(owlData).then(data => setOwldata(data));
    }

  }, [owlData, mapStatus]);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow;
