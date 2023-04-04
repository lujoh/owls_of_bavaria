import './MapWindow.css';
import React, {useState, useEffect, useRef} from 'react';
import {getOwls} from '../data/getOwls';
import {webmap, view, initialize} from '../data/initializeMap';
import { loadOwlFeatureLayer } from '../data/loadOwlFeatureLayer';


function MapWindow() {
  const elementRef = useRef();
  const [owlData, setOwldata] = useState([]);
  const [mapStatus, setMapStatus] = useState("not loaded")

  useEffect(() => {
    if (mapStatus == "not loaded"){
      initialize(elementRef.current);
      setMapStatus("loaded")
    }
    console.log(owlData);
    if (owlData && owlData.length > 0 && mapStatus == "loaded"){
      loadOwlFeatureLayer(owlData, webmap);
      setMapStatus("layer added")
    } else {
      getOwls(owlData).then(data => setOwldata(data));
    }

  }, [owlData, mapStatus]);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow;
