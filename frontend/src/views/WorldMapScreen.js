import React, { useState, useEffect } from "react";
import Map from "../components/Map.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./WorldMapScreen.css";
import axios from "axios";
import defaultJson from "../components/geojson/default.json"
import {getCountriesDict} from "../components/CountriesArray.js"



function WorldMapScreen() {
  const [chosenCountries, setChosenCountries] = useState([]);
  const [getCodes, setCodes] = useState([]);
  const [countryData, setCountryData] = useState(defaultJson);


  const countriesDict = getCountriesDict();


  useEffect(() => {
    for (const count in chosenCountries) { 
      try {
      var country = chosenCountries[count];

      const code = countriesDict[country]
      const codes = getCodes;
      //console.log("Temp prior:", temp); 
      if (!codes.includes(code)){
        codes.push(code); 
        setCodes(codes);

        setCountryData(defaultJson);
        for (var i = 0; i < codes.length; i++) {
          const code = codes[i];
          console.log("iteration...");
          try {
            console.log("trying backend api call for code: ", code);
            const response = axios.get(
              `http://localhost:4000/api/country/${code}`
            ).then(data => {
              console.log("then data:", data);
              const responseData = data;
              console.log("fetchData response:", response);
              console.log("responseData.data: ", responseData.data);
          
              
              setCountryData((prevData) => ({
                ...prevData,
                features: [...prevData.features, responseData.data],
              }));
            })
            // const responseData = response.data;
            // console.log("fetchData response:", response);
            // console.log("response.data: ", response.data);
            // console.log("alternate :", response.Object);
            
            // setCountryData((prevData) => ({
            //   ...prevData,
            //   features: [...prevData.features, responseData],
            // }));
          } catch (error) {
            console.error("ERROR:", error);
          }
        }
      }

      

      
      }
      
      catch (error) {
        console.error("error:", error)
      }
    }
    
  }, [chosenCountries])
  return (
    <div className="world-map-screen">
      <Navbar />
      <div className="row">
        <div className="sidebar-column">
          <Sidebar
            chosenCountries={chosenCountries}
            setChosenCountries={setChosenCountries}
          />
        </div>
        <div className="map-column">
          <Map codes={getCodes} countryData={countryData} />
         
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WorldMapScreen;
