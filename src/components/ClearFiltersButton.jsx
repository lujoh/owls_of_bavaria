import './ClearFiltersButton.css';
import { useDispatch } from 'react-redux';
import { applyFilters } from '../features/map/mapSlice';

function ClearFiltersButton({selected_filters}) {
    const dispatch = useDispatch();
    let filters = {};
    switch (selected_filters){
        case "All":
            filters["year"] = null;
            filters["obscured"] = false;
        case "Species":
            filters["species"] = null;
    }
    return (
        <button className='clearFiltersButton' onClick={() => dispatch(applyFilters(filters))}>Clear {selected_filters} Filters</button>
    )
}

export default ClearFiltersButton;