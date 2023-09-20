import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import NotBayernURL from "../../assets/NotBayern.geojson?url"
import configureApp from "../../../configureApp";

esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
export const webmap = new Map({
    basemap: "arcgis-dark-gray"
});

export const view = new MapView({
    map: webmap,
    center: [configureApp.CENTER[1], configureApp.CENTER[0]],
    zoom: configureApp.DEFAULT_ZOOM,
    constraints:{
        geometry: {
            type: "extent",
            xmin: configureApp.EXTENT.xmin,
            ymin: configureApp.EXTENT.ymin,
            xmax: configureApp.EXTENT.xmax,
            ymax: configureApp.EXTENT.ymax
        },
        minZoom: 5
    }
   });

export const background = new GeoJSONLayer({
    url: NotBayernURL,
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [240, 239, 237],
            outline: {
                color: "black",
                width: 0.2,
            }
        }
    },
    opacity: 0.50,
})

export const owlFeatureLayer = new FeatureLayer({
    source: {},
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-marker",
            color: "#102A44",
            outline: {
                color: "#c38b1a",
                width: 3.5
            }
        }
    },
    popupTemplate: {
        title: configureApp.SPECIES_NAME + " Observation",
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
                    "<p>Observed on {observation_date}</p>" + "{obscured_text}"
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
            name: "species_id",
            alias: "species_id",
            type: "integer"
        },
        {
            name: "observation_date",
            alias: "observation_date",
            type: "string"
        },
        {
            name: "observation_year",
            alias: "observation_year",
            type: "integer"
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
        },
        {
            name: "obscured_text",
            alias: "obscured_text",
            type: "string"
        },
        {
            name: "obscured",
            alias: "obscured",
            type: "integer"
        }
    ]
});