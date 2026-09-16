// src/components/CitySearch.js

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations = [], setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Sync suggestions whenever allLocations array or length changes
  useEffect(() => {
    if (allLocations && allLocations.length) {
      setSuggestions(allLocations);
    } else {
      setSuggestions([]);
    }
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (value.length > 0 && filteredLocations.length === 0) {
      infoText =
        "We cannot find the city you are looking for. Please try another city.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <li key={suggestion} onClick={handleItemClicked}>
                {suggestion}
              </li>
            ))
          ) : (
            <li key="no-results" style={{ fontStyle: "italic", color: "#888" }}>
              No cities found
            </li>
          )}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
