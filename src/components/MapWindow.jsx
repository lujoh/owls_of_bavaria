import './MapWindow.css';
import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addOwlLayer, selectMapStatus, initializeMap, selectOwlLayerStatus} from '../features/map/mapSlice';
import {selectOwls, selectOwlStatus, getOwlData} from '../features/owls/owlSlice';


function MapWindow() {
  const elementRef = useRef();
  const owls = useSelector(selectOwls);
  const owlStatus = useSelector(selectOwlStatus);
  const mapStatus = useSelector(selectMapStatus);
  const dispatch = useDispatch();
  const owlLayerStatus = useSelector(selectOwlLayerStatus);

  useEffect(() => {
    if (mapStatus == "not loaded"){
      dispatch(initializeMap(elementRef.current));
    }
    if (owlStatus == "not loaded" || owlStatus == "reload"){
      dispatch(getOwlData());
    }
    if (owlStatus == "loaded" && mapStatus == "loaded" && owlLayerStatus == "not loaded"){
      dispatch(addOwlLayer());
    }
    // if (owlData && owlData.length > 0 && mapStatus.baseLoaded == "loaded" && mapStatus.owlLayerLoaded == "not loaded"){
    //   loadOwlFeatureLayer(owlData, webmap);
    //   dispatch(addOwlLayer());
    // } else {
    //   getOwls(owlData).then(data => setOwldata(data));
    // }

  }, [owlStatus, mapStatus]);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow;
