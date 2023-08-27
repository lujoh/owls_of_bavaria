import { useDispatch, useSelector } from 'react-redux';
import './FilterSection.css';
import { MdOutlineExpandMore } from 'react-icons/md';
import { applyFilters, selectCurrentFilters } from '../features/map/mapSlice';
import { selectYears } from '../features/owls/owlSlice';
import { useRef } from 'react';

function FilterSection({expandedSection, setExpandedSection}){

    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => selectCurrentFilters(state));
    //get available years for tick marks on the slider
    const available_years = useSelector((state) => selectYears(state));
    const yearRef = useRef(available_years.max);
    const yearlist = [];
    for (let year = available_years.min; year <= available_years.max; year++) {
        yearlist.push(
            <option key={year} value={year} label={year}></option>
        )
    }
    const setYearFilter = (target) => {
        let yearFilter = null;
        if (target.id == "allYears"){
            if (!target.checked){
                yearFilter = yearRef.current.value;
            }
        } else {
            yearFilter = target.value;
        }
        dispatch(applyFilters({year: yearFilter}));
    }
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
                        onChange={(e) =>dispatch(applyFilters({obscured: e.target.checked}))} /> 
                        Hide obscured locations
                    </label> 
                    <br />
                    
                    <label>
                        <input type='checkbox' id='allYears' name='allYears' 
                        checked={!currentFilters.year ? 'checked' : ''}
                        onChange={(e) => setYearFilter(e.target)} 
                         /> 
                        See all years
                    </label>
                    <br />
                    <p>
                        Currently Showing: 
                        <span className="filterSection_range_value">
                            {currentFilters.year ? currentFilters.year : "All years"}
                        </span>
                    </p>
                    <label>
                        Select a year: <br />
                        <input 
                        type='range' 
                        name='year'
                        className='filterSection_range'
                        min={available_years.min} max={available_years.max} step={1} 
                        id='year'
                        list='years' 
                        onChange={(e) => setYearFilter(e.target)} 
                        ref={yearRef} /> 
                    </label>

                    <datalist id='years'>
                        {yearlist}
                    </datalist>
                    
                </div>
            </div>
        </section>
    )
}
export default FilterSection;