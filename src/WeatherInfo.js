

const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct"
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = import.meta.env.VITE_API_KEY;


let getCoordinates = async (city) => {
    let response = await fetch(`${GEOCODING_API_URL}?q=${city}&appid=${API_KEY}`);
    let jsonResponse = await response.json();
    if (!jsonResponse.length) {
        throw new Error("City not found");
    } else{
        let {lat,lon} = jsonResponse[0]
        return {lat,lon}
    }
};

export const getWeatherInfo = async (city) => {
    let {lat,lon} = await getCoordinates(city);
    let response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    let jsonResponse = await response.json();
    let result = {
        city:jsonResponse.name,
        temp:jsonResponse.main.temp,
        tempMin:jsonResponse.main.temp_min,
        tempMax:jsonResponse.main.temp_max,
        humidity:jsonResponse.main.humidity,
        feelsLike:jsonResponse.main.feels_like,
        weather:jsonResponse.weather[0].description,
    }
    return result;
}

