import './SpeciesCard.css'
import { useDispatch, useSelector } from "react-redux";
import { selectTaxaById } from "../features/owls/owlSlice";
import { filterOwlLayerBySpecies, selectCurrentSpeciesFilter } from '../features/map/mapSlice';
import {MdFilterAltOff, MdFilterAlt} from "react-icons/md"

function SpeciesCard({taxonId}) {
    const taxon = useSelector((state) => selectTaxaById(state, taxonId));
    const dispatch = useDispatch()
    const addFilter = () => {
        dispatch(filterOwlLayerBySpecies(taxonId))
    }
    const removeFilter = () => {
        dispatch(filterOwlLayerBySpecies(null))
    }
    const currentSpeciesFilter = useSelector((state) => selectCurrentSpeciesFilter(state))
    const addFilterButton = <button
        aria-label='Filter by {taxon.species_name}'
        onClick={addFilter}
        >
            <MdFilterAlt />
        </button>
    const removeFilterButton = <button
        aria-label='Remove {taxon.species_name} Filter'
        onClick={removeFilter}
        >
            <MdFilterAltOff />
        </button>
 return (
    <div key={taxonId} className='speciesCard'>
        <div>
            <p><b>{taxon.species_name}</b> ({taxon.count} Observations)</p>
            {currentSpeciesFilter == taxonId ? removeFilterButton : addFilterButton}
        </div>
        <div>
            <p>{taxon.species_scientific}</p>
            <p>
                {taxon.threatened ? "threatened" : "not threatened"}
            </p>
            <p>
                {taxon.native ? "native" : "not native"}
            </p>
        </div>
    </div>
 )
}

export default SpeciesCard