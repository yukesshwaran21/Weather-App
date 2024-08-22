import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState("chennai");
  const [city, setCity] = useState(null);

  const getWeatherData = async () => {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search},IN&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`);
      if (!response.ok) {
        throw new Error("City not found or not in India");
      }
      let result = await response.json();
      setCity(result);
    } catch (error) {
      setCity(null);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [search]);

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input type="search" placeholder="enter city name" spellCheck="false" onChange={(e) => setSearch(e.target.value)} />
        </div>
        {city ? (
          <div className="weather">
            <img className="weather-icon" src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png" alt="weather-icon" />
            <h1 className="temp">{city?.main?.temp}°C</h1>
            <h2 className="city">{city?.name}</h2>
            <div className="details">
              <div style={{ display: 'flex' }} className="col">
                <img className="humi" src="https://icons.veryicon.com/png/o/education-technology/iot-icon/humidity-4.png" alt="humidity-icon" />
                <div className="info">
                  <p className="humidity">{city?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="https://cdn-icons-png.flaticon.com/512/136/136712.png" alt="wind-icon" />
                <div className="info">
                  <p className="wind">{city?.wind?.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>City not found or not in India.</p>
        )}
      </div>
    </div>
  );
}

export default App;
