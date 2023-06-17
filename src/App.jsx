import './App.css';
import MapWindow from './components/MapWindow'
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="app">
      <header className='app_header'><h1>Owls of Bavaria</h1></header>
      <div className='app_row'>
        <MapWindow />
        <Sidebar />
      </div>
    </div>
  )
}

export default App
