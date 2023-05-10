import React, { useState } from 'react';
import axios from 'axios';
import './weatherman.styles.css';
import weather from './weather.jpg'

function WeatherMan() {
    
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const apiKey = 'a9748d79a46cf49feb114c7f80c91c7a'

  ;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
      .then(response => {
        setTemperature(response.data.main.temp);
        setDescription(response.data.weather[0].description);
        setError('');
      })
      .catch(error => {
        setTemperature('');
        setDescription('');
        setError('Error retrieving weather data. Please try again.');
      });
  };

  return (
    <div>

      <h1 className='ww'>WeatherMan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a city:
          <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {temperature && description &&
        <div>
          <p>The temperature in {location} is {temperature} degrees Celsius.</p>
          <p>The weather is currently {description}.</p>
        </div>
      }
      {error &&
        <p>{error}</p>
      }
    </div>
  );
}

export default WeatherMan;