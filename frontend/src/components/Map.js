import React, { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
//import geoJson from './geojson/countries.geojson';



export default function Map( {countryData} ) {
  const mapContainer = useRef(null);
  const finalMap = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(1.5);


  console.log("CountryData (outside useEffect): ", countryData);
  
  

  useEffect(() => {
    // if (finalMap.current) {
    //   console.log("Returning....");
    //   // finalMap.current.removeSource("countries");
    //   // finalMap.current.addSource("countries", {
    //   //   type: "geojson",
    //   //   data: countryData,
    //   // });
    //   return 
    // }
   //stops map from intializing more than once

    console.log("USEEFFECT countryData:", countryData);
    //const countryData = JSON.parse(JSON.stringify(countryData));
    //console.log("USEEFFECT clonedCountryData:", clonedCountryData);


    var map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [lng, lat],
      zoom: zoom,
    });

    // EXAMPLE CODE
      map.on("load", function () {
      map.addSource("countries", {
        type: "geojson",
        data: countryData,
      });

      map.addLayer({
        id: "polygons",
        type: "fill",
        source: "countries", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#FFAA01", // orange color fill
          "fill-opacity": 0.5,
        },
      });

      // outline of polygons
      map.addLayer({
        id: "outline",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#F3A040", // orange outline
          "line-width": 2,
        },
      });

      // on click popup
      map.on("click", "polygons", function (e) {
        new maplibregl.Popup({ closeOnMove: true })
          .setLngLat(e.lngLat)
          .setHTML(
            "<h3>" +
              "Placeholder" +
              "</h3><p>" +
              e.features[0].properties.ADMIN +
              "</p>" +
              "<h3>" +
              "Placeholder" +
              "</h3><p>" +
              e.features[0].properties.ADMIN +
              "</p>" +
              "<h3>" +
              "Example Link" +
              "</h3><a href='https://en.wikipedia.org/wiki/LGBT_rights_by_country_or_territory'>" +
              "Learn more..." +
              "</a>"
          )
          .addTo(map);
      });

      // example of a marker
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([139.7525, 35.6846])
        .addTo(map);
        

    });

    finalMap.current = map;
  },[countryData]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}