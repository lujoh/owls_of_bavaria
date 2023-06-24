import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"

esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
export const webmap = new Map({
    basemap: "arcgis-dark-gray"
});

export const view = new MapView({
    map: webmap,
    center: [11.4, 49.0],
    zoom: 7,
    constraints:{
        geometry: {
            type: "extent",
            xmin: 9.8,
            ymin: 47.1,
            xmax: 14.9,
            ymax: 51.6
        },
        minZoom: 5
    }
   });

export const background = new GeoJSONLayer({
    url: "http://localhost:5173/src/assets/NotBayern.geojson",
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [230, 230, 230],
            outline: {
                color: "black",
                width: 0.2,
            }
        }
    },
    opacity: 0.90,
})