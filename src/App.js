import { useState } from "react";
import axios from "axios";
import Footer from "./components/footer/footer";
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

    setCity("");
  };

  let date = new Date();
  let currDate = date.getDate();
  let currMonth = date.toLocaleString("en-us", { month: "long" });
  let year = date.getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        {weather ? (
          <div className="report">
            <div className="left">
              <h1 className="city">{weather.data.name}</h1>
              <p>
                {currMonth + " " + currDate}, {year}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
              />
              <b>
                {" "}
                <h5>{weather.data.weather[0].description.toUpperCase()}</h5>
              </b>
            </div>
            <div className="right">
              <h1 className="tempFont">
                {(weather.data.main.temp - 273.15).toFixed()}°
              </h1>
              <h3>
                {(weather.data.main.temp_max - 273.15).toFixed()}
                °/
                <span className="minTemp">
                  {(weather.data.main.temp_min - 273.15).toFixed()}°
                </span>
              </h3>
              <h3>
                Feels like : {(weather.data.main.feels_like - 273.15).toFixed()}
                °
              </h3>
              <h3>Humidity : {weather.data.main.humidity}</h3>
            </div>
          </div>
        ) : (
          <h3> </h3>
        )}
        <h1>Weather App</h1>

        <form onSubmit={search}>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control border  rounded-top  "
              value={cityName}
              placeholder="Enter City Name"
              aria-label="Entery City Name"
              aria-describedby="button-addon2"
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="btn btn-light" id="button-addon2">
              Search
            </button>
          </div>
        </form>
        <Footer />
      </header>
    </div>
  );
}

export default App;
