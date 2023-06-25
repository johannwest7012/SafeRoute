import React, { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import axios from "axios";
//import geoJson from './geojson/countries.geojson';



export default function Map( {countryData} ) {
  const mapContainer = useRef(null);
  const finalMap = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(1.5);

  


  //console.log("CountryData (outside useEffect): ", countryData);
  
  

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

    // console.log("USEEFFECT countryData:", countryData);
    // var countryDataCopy = [...countryData];
    // for (const i = 0; i< countryDataCopy.length; i++){
    //   const response = axios.get(
    //     `http://localhost:4000/api/hri/${countryDataCopy[i].properties.ADMIN}`
    //   ).then(data => {
    //     console.log("then data:", data);
    //     const responseData = data;
    //     console.log("fetchData response:", response);
    //     console.log("responseData.data: ", responseData.data);
    
    //     console.log("HUMAN FREEDOM", responseData.data["HUMAN FREEDOM"])
    //     countryDataCopy.properties.HUMANFREEDOM = responseData.data["HUMAN FREEDOM"];
    //   })
    // }

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

      // var hfscorecolor = '';
      // var hfrankcolor = ''; 
      // var sscolor = ''; 
      // if (parseFloat(e.features[0].properties.HUMANFREEDOMSCORE) < 5) { 
      //   hfscorecolor = 'red';
      // }
      // else { 
      //   hfscorecolor = 'green';
      // }
      // if (parseFloat(e.features[0].properties.HUMANFREEDOMRANK) < 80) { 
      //   hfrankcolor = 'red';
      // }
      // else { 
      //   hfrankcolor = 'green';
      // }
      // if (parseFloat(e.features[0].properties.SECURITYANDSAFETY) < 5) { 
      //   sscolor = 'red';
      // }
      // else { 
      //   sscolor = 'green';
      // }
      map.on("click", "polygons", function (e) {
        new maplibregl.Popup({ closeOnMove: true })
          .setLngLat(e.lngLat)
          .setHTML(

      
            "<br/><h3 class='text'>" +
            e.features[0].properties.ADMIN +
              '</h3>' + 
            
              "<h3>" +
              "Overall Freedom Rank" +
              `</h3><p style="color: ${e.features[0].properties.HUMANFREEDOMRANKCOLOR}" class="value">` +
              e.features[0].properties.HUMANFREEDOMRANK + "/165" +
              "</p>" +
              "<h3>" +
              "Overall Freedom" +
              `</h3><p style="color: ${e.features[0].properties.HUMANFREEDOMSCORECOLOR}" class="value">` +
              e.features[0].properties.HUMANFREEDOMSCORE +
              "</p>" +
              "<h3>" +
              "Security and Safety" +
              `</h3><p style="color: ${e.features[0].properties.SECURITYANDSAFETYCOLOR}" class="value">`+ 
              e.features[0].properties.SECURITYANDSAFETY  +
              "</p>"+ 
              "<h3>" +
              "Religious Freedom" +
              `</h3><p style="color: ${e.features[0].properties.RELIGIONCOLOR}" class="value">`+
              e.features[0].properties.RELIGION  +
              "</p>"+ 
      
              "<h3>" +
              "Same-sex Relationships Freedom" +
              `</h3><p style="color: ${e.features[0].properties.SSRELATIONSHIPSCOLOR}" class="value">`+ 
              e.features[0].properties.SSRELATIONSHIPS  +
              "</p>"+ 
              "<br/><a href='https://www.cato.org/human-freedom-index/2020'>" +
              "Learn more..." +
              "</a>"
          )
          .addTo(map);
      });

      // example of a marker
      // new maplibregl.Marker({ color: "#FF0000" })
      //   .setLngLat([139.7525, 35.6846])
      //   .addTo(map);
        

    });

    finalMap.current = map;
  },[countryData]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}