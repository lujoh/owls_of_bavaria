import './SpeciesSection.css';
import { useSelector } from 'react-redux';
import { selectTaxa, selectOwlStatus } from '../features/owls/owlSlice';
import SpeciesCard from './SpeciesCard';


function SpeciesSection() {
    const taxa = useSelector(selectTaxa);
    const owlStatus = useSelector(selectOwlStatus)
    let taxaCardsContent = <p>Loading Owl Data...</p>
    if (owlStatus == "loaded") {
        taxaCardsContent = taxa.map((taxonId) => {
            return <SpeciesCard taxonId={taxonId} key={taxonId} />
        })
    }
    
    return (
        <section className='speciesSection'>
            <h2>Owl Species Observed</h2>
            {taxaCardsContent}
        </section>
    )
}

export default SpeciesSection;