import './SpeciesCard.css'
import { useSelector } from "react-redux";
import { selectTaxaById } from "../features/owls/owlSlice";

function SpeciesCard({taxonId}) {
    const taxon = useSelector((state) => selectTaxaById(state, taxonId));
 return (
    <div key={taxonId} className='speciesCard'>
        <h3>{taxon.species_name} ({taxon.count} Observations)</h3>
        <p>{taxon.species_scientific}</p>
        <p>
            {taxon.threatened ? "threatened" : "not threatened"}
        </p>
        <p>
            {taxon.native ? "native" : "not native"}
        </p>
    </div>
 )
}

export default SpeciesCard