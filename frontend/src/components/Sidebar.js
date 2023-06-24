import React, { useState } from "react";

import "./Sidebar.scss";

import {countryNamesAndCodes} from "./CountriesArray";
const countryNames = countryNamesAndCodes.map((nested) => nested[0]);

function Sidebar({ chosenCountries, setChosenCountries }) {
  //const [chosenCountries, setChosenCountries] = useState([]);
  const countriesObject = countryNamesAndCodes.reduce(
    (acc, [countryName, countryCode]) => {
      acc[countryName] = countryCode;
      return acc;
    },
    {}
  );

  function handleRemoveClick(country) {
    const updatedChosenCountries = chosenCountries.filter((c) => c !== country);
    setChosenCountries(updatedChosenCountries);
  }

  function SearchBar3() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const options = countryNames;

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
      if (event.target.value.length > 0) {
        const filteredOptions = options.filter((option) =>
          option.toLowerCase().includes(event.target.value.toLowerCase())
        );
        const firstTenElements = filteredOptions.slice(0, 10);
        setSearchResults(firstTenElements);
      } else {
        setSearchResults([]);
      }
    };

    const handleOptionClick = (option) => {
      const updatedChosenCountries = [...chosenCountries, option];
      setChosenCountries(updatedChosenCountries);
    };

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Where to?"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((option) => (
              <li
                key={option}
                className="search-results-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="sidebar">
      <SearchBar3 />

      {chosenCountries.length > 0 && (
        <div className="chosen-countries">
          <div className="list-header">
            <img src="airplaneicon.png" className="list-header-icon" />
            Destinations
          </div>

          {chosenCountries.map((country) => (
            <article key={country} className="countrycard__profile">
              <img
                src={`https://www.countryflagicons.com/FLAT/64/${countriesObject[country]}.png`}
                alt="flag"
                className="countrycard__picture"
              />
              <span className="countrycard__name">{country}</span>

              <button
                type="button"
                className="btn-close"
                onClick={() => handleRemoveClick(country)}
              >
                <span className="icon-cross"></span>
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
