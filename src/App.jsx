import './App.css';
import React, {useEffect, useRef} from 'react';



function App() {
  const elementRef = useRef();

  useEffect(() => {
    import("./data/MapStructure").then(
      app => app.initialize(elementRef.current)
    );
  }, []);

  return (
    <div className="App">
      <header><h1>Owl Dashboard</h1></header>
      <div id="MapDiv" ref={elementRef}></div>
    </div>
  )
}

export default App
