import './MapWindow.css';
import React, {useState, useEffect, useRef} from 'react';
import {getOwls} from '../data/getOwls';



function MapWindow() {
  const elementRef = useRef();
  const [owlData, setOwldata] = useState([]);

  useEffect(() => {
    import("../data/initializeMap").then(
      app => app.initialize(elementRef.current)
    );
    const getOwlData = async () => {
      const response = await getOwls()
      setOwldata(response);
    }
    getOwlData();
  }, []);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow;
