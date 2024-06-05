import React, { useEffect, useState } from 'react';
import './home.css';
import Search from '../components/images/search.png'; 
import Clouds from '../components/images/clouds.png';
import Wind from '../components/images/wind.png';
import Humidity from '../components/images/humidity.png';
import axios from 'axios';
import Mist from '../components/images/mist.png'
import Rain from '../components/images/rain.png'
import Drizzle from '../components/images/drizzle.png'
import Clear from '../components/images/clear.png'

const Home = () => {
  const [data, setData] = useState({
    celcius: 0,
    cityName: 'London',
    humidity: 10,
    speed: 24,
    image: '',
  });

  const [city, setCity] = useState('Tbilisi');

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0b73bd875465f16e0239a22ad9af355&units=metric`;
    axios.get(apiUrl)
      .then(res => {
        let imagePath='';
        if(res.data.weather[0].main=='clouds')
          {
            imagePath=Clouds;
          }
          else  if(res.data.weather[0].main=='Clear')
            {
              imagePath=Clear;
            }
          else  if(res.data.weather[0].main=='Drizzle')
            {
              imagePath=Drizzle;
            }
          else  if(res.data.weather[0].main=='Mist')
            {
              imagePath=Mist;
            }
          else  if(res.data.weather[0].main=='Rain')
            {
              imagePath=Rain;
            }
          else
            {
              imagePath=Clouds;
            }
        setData({
          celcius: res.data.main.temp,
          cityName: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath
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
          <img src={data.image} alt="Clouds" />
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