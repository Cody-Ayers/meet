// src/components/NumberOfEvents.js

import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberEvents, setNumberEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberEvents(value);
    setCurrentNOE(value);
    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Please enter a number greater than 0";
      setErrorAlert(errorText);
    } else {
      errorText = "";
      setErrorAlert(errorText);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={numberEvents}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
