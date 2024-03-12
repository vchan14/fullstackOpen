import axios from 'axios';
const baseWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?units=metric&`;

const longLatUrl = `http://api.openweathermap.org/geo/1.0/direct?`;

const api_key = import.meta.env.VITE_SOME_KEY


const getLongLat = (cityName) => {
	return axios
		.get(`${longLatUrl}q=${cityName}&limit=5&appid=${api_key}`)
		.then(obj => {
			const {lon, lat} = obj.data[0];
			return {
				long: lon,
				lat: lat
			}
		})
}


const getTempWindIcon = (long, lat) => {
	return axios
		.get(`${baseWeatherUrl}lat=${lat}&lon=${long}&appid=${api_key}`)
		.then(obj => {
			const data = obj.data;
			const icon = data.weather[0]["icon"];
			const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
			return {
				temp: data.main.temp,
				wind: data.wind.speed,
				iconUrl
			}
		})
}

const getWeatherByCity = (city) => {
	return getLongLat(city)
		.then(obj => {
			const {long, lat} = obj;
			return getTempWindIcon(long, lat);
		})
}

export default getWeatherByCity;