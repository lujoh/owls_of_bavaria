import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;
export const map = new Map({
    basemap: "arcgis-dark-gray"
});

export const view = new MapView({
    map: map,
    center: [11.4, 48.7],
    zoom: 13
   });

  export const initialize = (container) => {
    view.container = container;
    view
      .when(view.goTo({
        center: [48.7, 11.4],
        zoom: 12
      }))
      .then(_ => {
        console.log("Map and View are ready.");
      })
      .catch(function(err) {
        if(import.meta.env.VITE_DEBUG){
          console.error("MapView rejected:", err);
        } else {
          console.error("There was an Error Loading the Map.");
        }
        
      });
    return () => {
      view.container = null;
    };
  };