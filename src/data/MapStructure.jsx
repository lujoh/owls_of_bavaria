import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView";


export const map = new Map({
    basemap: "satellite"
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
        console.log("Map and View are ready");
      })
      .catch(function(err) {
        console.error("MapView rejected:", err);
      });
    return () => {
      view.container = null;
    };
  };