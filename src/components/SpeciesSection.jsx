import './SpeciesSection.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaxa, selectOwlStatus } from '../features/owls/owlSlice';
import { filterOwlLayerBySpecies } from '../features/map/mapSlice';
import SpeciesCard from './SpeciesCard';
import { useState } from 'react';


function SpeciesSection() {
    const taxa = useSelector(selectTaxa);
    const [detailVisibilityAll, setDetailVisibilityAll] = useState("collapsed");
    const owlStatus = useSelector(selectOwlStatus)
    let taxaCardsContent = <p>Loading Owl Data...</p>
    if (owlStatus == "loaded") {
        taxaCardsContent = taxa.map((taxonId) => {
            return <SpeciesCard taxonId={taxonId} detailVisibilityAll={detailVisibilityAll} setDetailVisibilityAll={setDetailVisibilityAll}  key={taxonId} />
        })
    }
    const dispatch = useDispatch();
    return (
        <section className='speciesSection'>
            <div className='speciesSection_header'>
                <h2>Owl Species Observed</h2>
                <div>
                    <button onClick={() => setDetailVisibilityAll("expanded")}>Expand All Species</button>
                    <button onClick={() => setDetailVisibilityAll("collapsed")}>Collapse All Species</button>
                    <button onClick={() => dispatch(filterOwlLayerBySpecies(null))}>Clear Filters</button>
                </div>
            </div>
            
            <div className='speciesSection_cards'>
                {taxaCardsContent}
            </div>
        </section>
    )
}

export default SpeciesSection;