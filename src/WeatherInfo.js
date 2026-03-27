const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct"
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const ICON_API_URL = "https://openweathermap.org/payload/api/media/file/"
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

const getWindDirection = (deg = 0) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
};

const getDateTime = (timezone) => {
    const timezoneOffset = timezone * 1000; // convert sec → ms
    const nowUTC = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const cityTime = new Date(nowUTC + timezoneOffset);
    const date = cityTime.toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric", });
    const time = cityTime.toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", });
    return {date,time}
}

export const getWeatherInfo = async (city) => {
    let {lat,lon} = await getCoordinates(city);
    let response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    let jsonResponse = await response.json();
    let icon_url = (`${ICON_API_URL}${jsonResponse.weather[0].icon}.png`)
    const { date, time } = getDateTime(jsonResponse.timezone);
    // console.log(jsonResponse)
    let result = {
        city:jsonResponse.name,
        country:jsonResponse.sys.country,
        // Date-Time
        date,time,
        // Temperature
        temp:jsonResponse.main.temp,
        tempMin:jsonResponse.main.temp_min,
        tempMax:jsonResponse.main.temp_max,
        feelsLike:jsonResponse.main.feels_like,
        // Weather
        weather_main:jsonResponse.weather[0].main,
        weather_description:jsonResponse.weather[0].description,
        icon:icon_url,
        // Stats
        humidity:jsonResponse.main.humidity,
        visibility:(jsonResponse.visibility/1000),
        // Wind
        windSpeed: jsonResponse.wind.speed,
        windDirection: getWindDirection(jsonResponse.wind.deg),
        // Clouds
        cloud: jsonResponse.clouds.all,
        // Pressure
        pressure: jsonResponse.main.pressure,
        // Sun timings (convert to readable time)
        sunrise: new Date(jsonResponse.sys.sunrise * 1000).toLocaleTimeString("en-IN", {hour: "2-digit", minute: "2-digit",}),
        sunset: new Date(jsonResponse.sys.sunset * 1000).toLocaleTimeString("en-IN", {hour: "2-digit", minute: "2-digit",}),
    }
    return result;
}
