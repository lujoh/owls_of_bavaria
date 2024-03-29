import './SpeciesCard.css'
import { useDispatch, useSelector } from "react-redux";
import { selectTaxaById } from "../features/owls/owlSlice";
import { applyFilters, selectCurrentSpeciesFilter } from '../features/map/mapSlice';
import {MdFilterAlt, MdOutlineExpandMore, MdOutlineExpandLess} from "react-icons/md"
import { useState, useEffect } from 'react';

function SpeciesCard({taxonId, detailVisibilityAll, setDetailVisibilityAll}) {
    const taxon = useSelector((state) => selectTaxaById(state, taxonId));
    const dispatch = useDispatch();
    const addFilter = () => {
        dispatch(applyFilters({species: taxonId}))
    }
    const removeFilter = () => {
        dispatch(applyFilters({species: null}))
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
        className='speciesCard_button_active'
        >
            <MdFilterAlt />
        </button>
    const showDetailsButton = <button 
        aria-label='See more about {taxon.species_name}' 
        onClick={() => setDetailVisibility(!detailVisibility)}
        >
            <MdOutlineExpandMore />
        </button>
    const hideDetailsButton = <button 
        aria-label='Hide details for {taxon.species_name}' 
        onClick={() => setDetailVisibility(!detailVisibility)}
        >
            <MdOutlineExpandLess />
        </button>
    const [detailVisibility, setDetailVisibility] = useState(false);
    //set detailvisibility all in parent component to neutral if visibility gets changed from component
    useEffect(() => {
        if ((detailVisibility && detailVisibilityAll == "collapsed") 
        || (!detailVisibility && detailVisibilityAll == "expanded")){
            setDetailVisibilityAll("neutral");
        }
    }, [detailVisibility]); 
    // set detail visibility if detailVisibilityAll from props changes to expanded or collapsed
    //does nothing if it is set to neutral
    useEffect(() => {
        switch(detailVisibilityAll) {
            case "expanded":
                setDetailVisibility(true);
                break;
            case "collapsed":
                setDetailVisibility(false);
                break;
        }
    }, [detailVisibilityAll]); 
 return (
    <div key={taxonId} className={currentSpeciesFilter == taxonId ? 'speciesCard active_card' : 'speciesCard'}>
        <div className='speciesCard_main'>
            <div>
                <img src={taxon.photo} width='75px' height='75px' />
            </div>
            <div className='speciesCard_title'>
                <p><b>{taxon.species_name}</b></p>
                <p>({taxon.count}<span className='speciesCard_hide_mobile'> Observations</span>)</p>
            </div>
            
            <div className='speciesCard_buttons'>
                {currentSpeciesFilter == taxonId ? removeFilterButton : addFilterButton}
                {detailVisibility ? hideDetailsButton : showDetailsButton}
            </div>
        </div>
        <div 
        className={detailVisibility ? 'speciesCard_details_visible': 'speciesCard_details_hidden'}>
            <p>{taxon.species_scientific}</p>
            <p className={taxon.threatened ? "speciesCard_red_annotation" : "speciesCard_green_annotation"}>
                {taxon.threatened ? "threatened" : "not threatened"}
            </p>
            <p className={!taxon.native ? "speciesCard_red_annotation" : "speciesCard_green_annotation"}>
                {taxon.native ? "native" : "not native"}
            </p>
        </div>
    </div>
 )
}

export default SpeciesCard