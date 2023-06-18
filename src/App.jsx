import './App.css';
import MapWindow from './components/MapWindow'
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="app">
      <Sidebar />
      <MapWindow />
    </div>
  )
}

export default App
