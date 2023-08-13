import { useDispatch, useSelector } from 'react-redux';
import './FilterSection.css';
import { MdOutlineExpandMore } from 'react-icons/md';
import { filterObscuredSpecies, selectCurrentFilters } from '../features/map/mapSlice';

function FilterSection({expandedSection, setExpandedSection}){

    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => selectCurrentFilters(state));
    return(
        <section className='sidebar_section'>
            <div className='sidebar_section_header'>
                <button 
                onClick={() => setExpandedSection("filter")}
                className='sidebar_section_button'>Filters
                {expandedSection != "filter" ?<MdOutlineExpandMore /> : ""}
                </button>
            </div>
            <div className={expandedSection == "filter" ? "sidebar_section_body_expanded" : "sidebar_section_body_collapsed"}>
                <div className='filterSection_filters'>
                    <label>
                        <input type='checkbox' id='obscured' name='obscured' 
                        checked={currentFilters.obscured ? 'checked': ''}
                        onChange={(e) =>dispatch(filterObscuredSpecies(e.target.checked))} /> 
                        Hide obscured locations
                    </label> 
                    <br />
                    
                    {/* <label>
                        <input type='checkbox' id='allYears' name='allYears' /> 
                        See all years
                    </label> */}
                    
                </div>
            </div>
        </section>
    )
}
export default FilterSection;