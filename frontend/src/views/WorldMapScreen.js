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
    console.log("USE EFFECT chosenCountries", chosenCountries);
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

              var tempData = responseData.data;

              const response2 = axios.get(
                `http://localhost:4000/api/country/hri/${tempData.properties.ADMIN}`
              ).then(data => {
                // console.log("then data:", data);
                const responseData2 = data;
                // console.log("fetchData response:", response2);
                // console.log("responseData.data: ", responseData2.data);
            
                // console.log("HUMAN FREEDOM", responseData2.data["HUMAN FREEDOM"])
                tempData.properties.HUMANFREEDOMSCORE = responseData2.data["HUMAN FREEDOM"];
                if (parseFloat(responseData2.data["HUMAN FREEDOM"]) > 5) {
                  tempData.properties.HUMANFREEDOMSCORECOLOR = 'green';
                }
                else { 
                  tempData.properties.HUMANFREEDOMSCORECOLOR = 'red';

                }

                
                tempData.properties.HUMANFREEDOMRANK = responseData2.data["HUMAN FREEDOM RANK"];
                if (parseFloat(responseData2.data["HUMAN FREEDOM RANK"]) < 80) {
                  tempData.properties.HUMANFREEDOMRANKCOLOR = 'green';
                }
                else { 
                  tempData.properties.HUMANFREEDOMRANKCOLOR = 'red';
                }


                tempData.properties.SECURITYANDSAFETY = responseData2.data["B Security and Safety"];
                if (parseFloat(responseData2.data["B Security and Safety"]) > 5) {
                  tempData.properties.SECURITYANDSAFETYCOLOR = 'green';
                }
                else { 
                  tempData.properties.SECURITYANDSAFETYCOLOR = 'red';
                }

                tempData.properties.RELIGION = responseData2.data["Dia Freedom of Religion (V-Dem)"];
                if (parseFloat(responseData2.data["Dia Freedom of Religion (V-Dem)"]) > 5) {
                  tempData.properties.RELIGIONCOLOR = 'green';
                }
                else { 
                  tempData.properties.RELIGIONCOLOR = 'red';
                }

                tempData.properties.MOVEMENT = responseData2.data["Cia Freedom of Foreign Mvmt"];
                if (parseFloat(responseData2.data["Cia Freedom of Foreign Mvmt"]) > 5) {
                  tempData.properties.MOVEMENTCOLOR = 'green';
                }
                else { 
                  tempData.properties.MOVEMENTCOLOR = 'red';
                }

                tempData.properties.SSRELATIONSHIPS = responseData2.data["Gi Same-Sex Relationships"];
                if (parseFloat(responseData2.data["Gi Same-Sex Relationships"]) > 5) {
                  tempData.properties.SSRELATIONSHIPSCOLOR = 'green';
                }
                else { 
                  tempData.properties.SSRELATIONSHIPSCOLOR = 'red';
                }



                console.log("Added HUMAN FREEDOM for:", tempData.properties.ADMIN);
              })
          
              
              setCountryData((prevData) => ({
                ...prevData,
                features: [...prevData.features, tempData],
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
          <Map countryData={countryData} />
         
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WorldMapScreen;
