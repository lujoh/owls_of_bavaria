import Graphic from '@arcgis/core/Graphic';

const graphics = (data) => {
    let graphics = [];
    for (const observation_id in data.owls){
        const observation = data.owls[observation_id];
        const taxon = data.taxaById[observation.taxon_id];
        graphics.push(new Graphic({
            attributes: {
                ObjectId: observation.id,
                species_name: taxon.species_name,
                species_scientific: taxon.species_scientific,
                species_id: observation.taxon_id,
                license_code: observation.license_code,
                obscured_text: observation.obscured ? "<p>The location of this observation has been obscured.</p>" : "",
                obscured: observation.obscured ? 1 : 0,
                observation_date: observation.observation_date,
                observation_year: observation.observation_year,
                photo_attribution: observation.photo_attribution,
                // replacing sqare with medium retrieves a larger sized image
                photo_url: observation.photo_url.replace("square", "medium")
            },
            geometry: {
                type: "point",
                longitude: observation.longitude,
                latitude: observation.latitude
            },
            symbol: {
                //use a simple marker for now
                type: "simple-marker",
                color: [226, 119, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 2
                }
            }
        }))
    }
    return graphics;
}

export const loadOwlFeatureLayer = async (data, webmap, owlFeatureLayer) => {
    var owlGraphics = graphics(data);
    owlFeatureLayer.source = owlGraphics;
    webmap.layers.add(owlFeatureLayer);
}