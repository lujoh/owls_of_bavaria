import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

const setFilter = (filters) => {
    if (!filters.species && !filters.obscured) {
        return null;
    }
    var filterText = 
    filters.species ? "species_id=" + filters.species : "";
    filterText += (filters.species && filters.obscured) ? " AND " : ""
    filterText += filters.obscured ?"obscured=" + 0 : "";
    return new FeatureFilter({
        where: filterText
        
    })
}

export const loadFilterEffect = (owlFeatureLayer, filters) => {
    if (!filters.species && !filters.obscured){
        var filterEffect = null;
    } else {
        var filterEffect = new FeatureEffect({
        filter: setFilter(filters),
        includedEffect: "bloom(0.9 0.6pt 0)",
        excludedEffect: "grayscale(100%) opacity(30%)"
        })
    }
    owlFeatureLayer.featureEffect = filterEffect;
}

