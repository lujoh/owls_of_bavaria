import './Sidebar.css';
import SpeciesSection from './SpeciesSection';


function Sidebar() {

  return (
      <div className="sidebar">
        <SpeciesSection />
        <p>Owl observations courtesy of iNaturalist and the iNaturalist contributors. To add your own observations or suggest a different species id, go to the <a href='https://www.inaturalist.org/' target='blank'>iNaturalist website.</a></p>
      </div>
  )
}

export default Sidebar;