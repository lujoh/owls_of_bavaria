import './MapWindow.css';
import React, {useEffect, useRef} from 'react';



function MapWindow() {
  const elementRef = useRef();

  useEffect(() => {
    import("../data/initializeMap").then(
      app => app.initialize(elementRef.current)
    );
  }, []);

  return (
      <div id="MapDiv" className="mapWindow" ref={elementRef}></div>
  )
}

export default MapWindow
