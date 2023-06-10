import './MapWindow.css';
import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addOwlLayer, selectMapStatus, initializeMap} from '../features/map/mapSlice';
import {getOwls} from '../data/getOwls';
import { loadOwlFeatureLayer } from '../data/loadOwlFeatureLayer';


function MapWindow() {
  const elementRef = useRef();
  const [owlData, setOwldata] = useState([]);
  const mapStatus = useSelector(selectMapStatus);
  const dispatch = useDispatch()

  useEffect(() => {
    if (mapStatus == "not loaded"){
      dispatch(initializeMap(elementRef.current));
    }
    console.log(owlData);
    // if (owlData && owlData.length > 0 && mapStatus.baseLoaded == "loaded" && mapStatus.owlLayerLoaded == "not loaded"){
    //   loadOwlFeatureLayer(owlData, webmap);
    //   dispatch(addOwlLayer());
    // } else {
    //   getOwls(owlData).then(data => setOwldata(data));
    // }

  }, [owlData, mapStatus]);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow;
