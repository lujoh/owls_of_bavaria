const configureApp = {
    "SPECIES_NAME": "Jumping Spider",
    // find the taxon ID by searching for the species name at https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa
    "TAXON_ID": "48139", 
    // find the place ID and center by searching for the place at https://api.inaturalist.org/v1/docs/#!/Places/get_places_autocomplete
    "PLACE_ID": "418",
    "CENTER": [37.0,-122.0],
    // you may have to experiment to find the ideal default zoom and extent
    "DEFAULT_ZOOM": 9,
    "EXTENT": {
        "ymin":36.3,
        "ymax":38.5,
        "xmin":-123.3,
        "xmax":-121.5
    }
}

export default configureApp;