import './FilterSection.css';
import { MdOutlineExpandMore } from 'react-icons/md';

function FilterSection({expandedSection, setExpandedSection}){

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
                    <input type='checkbox' id='obscured' name='obscured' />
                    <label for='obscured'>Hide obscured locations</label> 
                    <br />
                    <input type='checkbox' id='allYears' name='allYears' />
                    <label for='allYears'>See all years</label>
                    
                </div>
            </div>
        </section>
    )
}
export default FilterSection;