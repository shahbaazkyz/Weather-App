import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cityName, setCity] = useState();
  const [weather, setWeather] = useState();

  const search = (e) => {
    e.preventDefault();
    // Make a request for a user with a given ID
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a1a36875d10fc7c4646740447a2926d0`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data);
        const data = [response.data.main];
        setWeather(response);
        console.log(weather);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={search}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="report">
          {weather ? (
            <>
              <h3>City : {weather.data.name}</h3>
              <h3>
                {" "}
                Temperature : {(weather.data.main.temp - 273.15).toFixed(
                  2
                )} °C{" "}
              </h3>
              <h3>
                {" "}
                Feels like :{" "}
                {(weather.data.main.feels_like - 273.15).toFixed(2)} °C{" "}
              </h3>
              <p>{(weather.data.weather[0].description).toUpperCase()}</p>
            </>
          ) : (
            <h3> </h3>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
