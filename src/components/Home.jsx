import React, { useEffect, useState } from 'react';
import './home.css';
import Search from '../components/images/search.png'; 
import Clouds from '../components/images/clouds.png';
import Wind from '../components/images/wind.png';
import Humidity from '../components/images/humidity.png';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState({
    celcius: 0,
    cityName: 'London',
    humidity: 10,
    speed: 24,
  });

  const [city, setCity] = useState('Tbilisi');

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0b73bd875465f16e0239a22ad9af355&units=metric`;
    axios.get(apiUrl)
      .then(res => {
        setData({
          celcius: res.data.main.temp,
          cityName: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
        });
      })
      .catch(err => console.log(err));
  }, [city]);

  const handleClick = () => {
    const inputCity = document.querySelector('input').value;
    if (inputCity !== '') {
      setCity(inputCity);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className='container'>
      <div className="weather">
        <div className="search">
          <input type="text" placeholder='Enter city name' onKeyPress={handleKeyPress}/>
          <button onClick={handleClick}>
            <img src={Search} alt="Search" />
          </button>
        </div>
        <div className="info">
          <img src={Clouds} alt="Clouds" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.cityName}</h2>
          <div className="details">
            <div className="col">
              <img src={Wind} alt="Wind" />
              <h2>{Math.round(data.speed)} km/h</h2>
            </div>
            <div className="col">
              <img src={Humidity} alt="Humidity" />
              <h2>{Math.round(data.humidity)}%</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;