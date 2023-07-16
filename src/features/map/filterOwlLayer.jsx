import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

const setFilter = (filters) => {
    if (!filters.species) {
        return null;
    }
    return new FeatureFilter({
        where: "species_id=" + filters.species
    })
}

export const loadFilterEffect = (owlFeatureLayer, filters) => {
    if (!filters.species){
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

