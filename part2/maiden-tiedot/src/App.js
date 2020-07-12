import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((results) => setCountries(results.data));
  }, []);

  const fetchWeatherInfo = (city) => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;
    axios.get(url).then((results) => setWeather(results.data));
  };

  const renderCountryInfo = () => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(countryFilter.toLowerCase())
    );
    if (filteredCountries.length === 1) {
      const country = { ...filteredCountries[0] };
      fetchWeatherInfo(country.capital);
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language, index) => (
              <li key={index}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="flag" width={200} height={100} />
          {weather && (
            <>
              <h2>Weather in {country.city}</h2>
              <p>
                <b>temperature: {weather.current.temperature}</b>
              </p>
              <p>
                <b>wind: {weather.current.wind_speed}</b>
              </p>
            </>
          )}
        </div>
      );
    }
    if (filteredCountries.length <= 10) {
      return (
        <div>
          {filteredCountries.map((country, index) => (
            <p key={index}>
              {country.name}
              <button onClick={(e) => setCountryFilter(country.name)}>
                show
              </button>
            </p>
          ))}
        </div>
      );
    }
    return <p>Too many matches, specify another filter</p>;
  };

  return (
    <div>
      find countries
      <input
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
      />
      {countries.length > 0 && renderCountryInfo()}
    </div>
  );
};
