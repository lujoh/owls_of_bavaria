import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const graphics = (data) => {
    let graphics = [];
    for (const observation_id in data.owls){
        const observation = data.owls[observation_id];
        const taxon = data.taxa[observation.taxon_id];
        graphics.push(new Graphic({
            attributes: {
                ObjectId: observation.id,
                species_name: taxon.species_name,
                species_scientific: taxon.species_scientific,
                license_code: observation.license_code,
                observation_date: observation.observation_date,
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

export const loadOwlFeatureLayer = async (data, webmap) => {
    var owlGraphics = graphics(data);
    const featureLayer = new FeatureLayer({
        source: owlGraphics,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "#102A44",
                outline: {
                    color: "#598DD8",
                    width: 2
                }
            }
        },
        popupTemplate: {
            title: "Owl Observation",
            content: [
                {
                    type: "media",
                    mediaInfos: [
                        {
                            title: "<b>{species_name}</b>",
                            type: "image",
                            caption: "{photo_attribution}",
                            value: {
                                sourceURL: "{photo_url}"
                            }
                        }
                    ]
                },
                {
                    type: "text",
                    text: "<p><em>{species_scientific}</em></p>" +
                        "<p>Observed on {observation_date}</p>"
                },
            ]
        },
        objectIdField: "ObjectId",
        fields: [
            {
                name: "ObjectId",
                alias: "ObjectId",
                type: "oid"
            },
            {
                name: "species_name",
                alias: "species_name",
                type: "string"
            },
            {
                name: "species_scientific",
                alias: "species_scientific",
                type: "string"
            },
            {
                name: "observation_date",
                alias: "observation_date",
                type: "string"
            },
            {
                name: "photo_attribution",
                alias: "photo_attribution",
                type: "string"
            },
            {
                name: "photo_url",
                alias: "photo_url",
                type: "string"
            }
        ]
    })
    webmap.layers.add(featureLayer);
}