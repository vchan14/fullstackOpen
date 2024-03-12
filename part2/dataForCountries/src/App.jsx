import {useEffect, useState} from 'react'
import axios, {all} from "axios";
import getWeatherByCity from "../services/weather.js";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
function App() {
  const [countryInput, setCountryInput] = useState('');
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [countryStat, setCountryStat] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [weatherObj, setWeatherObj] = useState(null);

  // get a list of all country names first
  useEffect(()=> {
	  axios
		  .get(`${baseURL}/all`)
		  .then(response => {
			  const countryObjs = response.data;
			  const countries = countryObjs.map((countryObj) => countryObj.name.common.toLowerCase());
			  setAllCountries(countries);
			  setIsReady(true);
		  })

  }, []);


  const handleNameInputChange = (e) => {
	  const inputValue = e.target.value;
	  setCountryInput(inputValue);
	  const filteredCountries = allCountries.filter((country => country.includes(inputValue.toLowerCase())));
	  setDisplayedCountries(filteredCountries);
	  console.log(filteredCountries);
	  if (filteredCountries.length === 1) {
		  const country = filteredCountries[0];
		  updateCountryStat(country);
	  }
  }

  const updateCountryStat = (country) => {
	  axios.get(`${baseURL}/name/${country}`)
		  .then(response => {
			  const countryObj = response.data;
			  setCountryStat(countryObj);

			  const capital = countryObj.capital[0];
			  console.log('capital is ',capital);
			  getWeatherByCity(capital).then(obj => {
				  setWeatherObj(obj);
			  });

		  })

  }

  const handleShowClick = (e, country) => {
	  setCountryInput("");
	  setDisplayedCountries([country]);
	  updateCountryStat(country)
  }

  return (
    <>
		{!isReady && <h3>Loading.....</h3>}
	    find countries
	    <
			input
		    value={countryInput}
		    readOnly={!isReady}
		    onChange={handleNameInputChange}
	    />

	    {
		    (displayedCountries.length <= 10 && displayedCountries.length > 1  && displayedCountries.map((country) => (
			    <li key={country}>
				    {country} <button onClick={(e) => handleShowClick(e, country)}>show</button>
			    </li>
		    )))
	    }
	    {
		    (displayedCountries.length > 10 &&
		        <div>
			        Too many matches, specify another filter
		        </div>
		    )
	    }

		{/*displayed country stats*/}
	    {
			displayedCountries.length === 1 && countryStat &&
				<>
					<h2>
						{countryStat.name.common}
					</h2>
					<div>
						capital: {countryStat.capital[0]}
					</div>
					<div>
						area: {countryStat.area}
					</div>

					<h3>languages:</h3>
					{Object.values(countryStat.languages).map(lang => <li key={lang}>{lang}</li>)}
					<div>
						<img style={{width: 200}} src={countryStat.flags.svg}/>
					</div>
				</>
	    }
	    {/*displayed weather stats*/}
	    {
			(displayedCountries.length === 1 && countryStat && weatherObj &&
			<>
				<h3>
					Weather in {countryStat.capital[0]}
				</h3>
				<p>
					temperature {weatherObj.temp} Celcius
				</p>

				<img src={weatherObj.iconUrl}/>
				<p>
					wind {weatherObj.wind} m/s
				</p>
			</>)

	    }
    </>
  )
}

export default App
