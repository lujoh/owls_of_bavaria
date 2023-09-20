const configureApp = {
    "SPECIES_NAME": "Owl",
    // find the taxon ID by searching for the species name at https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa
    "TAXON_ID": "19350", 
    // find the place ID and center by searching for the place at https://api.inaturalist.org/v1/docs/#!/Places/get_places_autocomplete
    "PLACE_ID": "12871",
    "CENTER": [49.0,11.4],
    // you may have to experiment to find the ideal default zoom and extent
    "DEFAULT_ZOOM": 7,
    "EXTENT": {
        "xmin": 9.8,
        "xmax":14.9,
        "ymin":47.1,
        "ymax":51.6
    }
}

export default configureApp;