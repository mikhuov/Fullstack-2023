import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${API_KEY}`).then(result => {
      setWeather(result.data);
    });
  }, []);

  console.log(weather);
  
return (
  <div>
    { weather.main ? (
      <div>
        <h2>Weather in { country.capital }</h2>
        { weather.main.temp } Celsius
        <div>Wind { weather.wind.speed } m/s</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} lat="weather-icon"></img>
      </div>
    ) : null}
  </div>
);

};

export default Weather;