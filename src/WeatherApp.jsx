import { useState } from "react"
import InfoBox from "./InfoBox"
import NavBar from "./NavBar";
import lightBg from "./assets/light.png";
import darkBg from "./assets/dark.jpg";


const now = new Date();
const date = now.toLocaleDateString("en-IN", { // Example: "Thursday, 27 March 2026"
    weekday: "long", day: "numeric", month: "long", year: "numeric", });
    const time = now.toLocaleTimeString("en-IN", { // Example: "10:45 AM"
        hour: "2-digit", minute: "2-digit",});

export default function WeatherApp() {
    const [theme, setTheme] = useState("light");
    
    const style = {backgroundImage: `url(${theme === "light" ? lightBg : darkBg})`,
        backgroundSize: "cover", backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",minHeight: "100vh",}
    
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    
    const [weatherInfo, setWeatherInfo] = useState({
        city:"Wonderland",
        date:date,
        time:time,
        cloud: 40,
        country: "IN",
        feelsLike: 34.23,
        humidity: 28,
        icon: "https://openweathermap.org/payload/api/media/file/50d.png",
        pressure: 1004,
        sunrise: "5:46 AM",
        sunset: "6:03 PM",
        temp: 34.97,
        tempMax: 34.97,
        tempMin: 34.97,
        visibility: 5,
        weather_description: "haze",
        weather_main: "Haze",
        windDirection: "W",
        windSpeed: 3.09,
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div className={`WeatherApp ${theme}`} style={style}>
            <NavBar toggleTheme={toggleTheme} theme={theme} updateInfo={updateInfo} setTheme={setTheme}/>
            <div className="main-content">
                <InfoBox theme={theme} info={weatherInfo}/>
            </div>
        </div>
    )
}