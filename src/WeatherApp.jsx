import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city:"Wonderland",
        feelsLike: 28.76,
        humidity: 42,
        temp: 28.97,
        tempMax: 28.97,
        tempMin: 28.97,
        weather: "haze",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div className="WeatherApp">
            <br />
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}