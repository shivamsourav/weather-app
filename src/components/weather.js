import React, { useEffect, useState } from "react";
import Weathercard from "./weathercard";

function Weather() {
  const [searchValue, setsearchValue] = useState("bhagalpur");
  const [tempInfo, settempInfo] = useState({});
  const getWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=329b458149b1dc12f9a4cc9555297996`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherinfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      settempInfo(myNewWeatherinfo);
    } catch (error) {
      alert("Invalid Input!");
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            placeholder="search.."
            className="searchTerm"
            id="search"
            autoFocus
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeather}>
            Seach
          </button>
        </div>
      </div>
      {/* our temp card */}
      <Weathercard tempInfo={tempInfo} />
    </>
  );
}

export default Weather;
