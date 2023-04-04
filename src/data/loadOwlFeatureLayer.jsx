import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const graphics = (data) => {
    var graphics = data.map((observation) => {
        return new Graphic({
            attributes: {
                ObjectId: observation.id,
                species_name: observation.taxon.preferred_common_name,
                species_scientific: observation.taxon.name,
                license_code: observation.license_code,
                observation_date: observation.observed_on,
                photo_attribution: observation.observation_photos[0].photo.attribution,
                photo_url: observation.observation_photos[0].photo.url
            },
            geometry: {
                type: "point",
                longitude: observation.geojson.coordinates[0],
                latitude: observation.geojson.coordinates[1]
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
        })
    })
    return graphics;
}

export const loadOwlFeatureLayer = (data, webmap) => {
    var owlGraphics = graphics(data);
    console.log("getting graphics")
    console.log(owlGraphics);
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
                    type: "text",
                    text: "<p><b>{species_name}</b></p>" +
                        "<p><em>{species_scientific}</em></p>" +
                        "<p>Observed on {observation_date}</p>"
                },
                {
                    type: "media",
                    mediaInfos: [
                        {
                            title: "{species_name}",
                            type: "image",
                            caption: "{photo_attribution}",
                            value: {
                                sourceURL: "{photo_url}"
                            }
                        }
                    ]
                }
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