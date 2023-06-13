import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
export const webmap = new Map({
    basemap: "arcgis-dark-gray"
});

export const view = new MapView({
    map: webmap,
    center: [11.4, 48.7],
    zoom: 7
   });
