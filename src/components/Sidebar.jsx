import './Sidebar.css';
import SpeciesSection from './SpeciesSection';
import FilterSection from './FilterSection';
import { useState } from 'react';
import configureApp from '../../configureApp';

function Sidebar() {
const [expandedSection, setExpandedSection] = useState("species");
  return (
      <div className="sidebar">
        <header className='sidebar_header'><h1>{import.meta.env.VITE_WEBSITE_TITLE}</h1></header>
        <SpeciesSection expandedSection={expandedSection} setExpandedSection={setExpandedSection}  />
        <FilterSection expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
        <div>
          <p className='sidebar_annotation'>{configureApp.SPECIES_NAME} observations courtesy of iNaturalist and the iNaturalist contributors. To add your own observations or suggest a different species id, go to the <a href='https://www.inaturalist.org/' target='blank'>iNaturalist website.</a></p>
        </div>
      </div>
  )
}

export default Sidebar;