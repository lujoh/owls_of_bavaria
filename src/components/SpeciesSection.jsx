import './SpeciesSection.css';
import { useSelector } from 'react-redux';
import { selectTaxa, selectOwlStatus } from '../features/owls/owlSlice';
import SpeciesCard from './SpeciesCard';
import { useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import ClearFiltersButton from './ClearFiltersButton';


function SpeciesSection({expandedSection, setExpandedSection}) {
    const taxa = useSelector(selectTaxa);
    const [detailVisibilityAll, setDetailVisibilityAll] = useState("collapsed");
    const owlStatus = useSelector(selectOwlStatus);
    let taxaCardsContent = <p>Loading Owl Data...</p>
    if (owlStatus == "loaded") {
        taxaCardsContent = taxa.map((taxonId) => {
            return <SpeciesCard taxonId={taxonId} detailVisibilityAll={detailVisibilityAll} setDetailVisibilityAll={setDetailVisibilityAll}  key={taxonId} />
        })
    }
    return (
        <section className='sidebar_section'>
            <div className='speciesSection_header'>
                <button className='sidebar_section_button'
                onClick={() => setExpandedSection("species")}
                >Owl Species
                 {expandedSection != "species" ?<MdOutlineExpandMore /> : ""}
                 </button>
            </div>
            <div 
            className={expandedSection == "species" ? "sidebar_section_body_expanded" : "sidebar_section_body_collapsed"}>
                <div className='speciesSection_button_section'>
                        <button onClick={() => setDetailVisibilityAll("expanded")}>Expand All Species</button>
                        <button onClick={() => setDetailVisibilityAll("collapsed")}>Collapse All Species</button>
                        <ClearFiltersButton selected_filters="Species" />
                        <ClearFiltersButton selected_filters="All" />
                    </div>
                    <div className='speciesSection_cards'>
                        {taxaCardsContent}
                    </div>
            </div>
        </section>
    )
}

export default SpeciesSection;