import Divider from '@mui/material/Divider';
import { Cloud, Speed, SunnySnowing, WbTwilight, Visibility, WaterDropTwoTone, ThermostatSharp, 
    SevereColdSharp, AirSharp } from '@mui/icons-material';
    import "./InfoBox.css"

export default function InfoBox({info}) {

const capitalize = (str = "") => {
    return str.toLowerCase().split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");};

    return(
        <div className="InfoBox">
            <div className='glass-card'>
                <div className="cityInfo">
                    <h1>{info.city}, {info.country}</h1>
                    <p>{info.date}  |  {info.time}</p>
                </div>
                <div className='top'>
                        <img src={info.icon} alt="icon" />
                    <div className="left">
                        <h1 className="temp">{Math.round(info.temp)}<sup>&deg;C</sup></h1>
                        <p className="main">{info.weather_main}</p>
                        {(info.weather_main||"").toLowerCase() !== (info.weather_description||"").toLowerCase() && (
                            <p className="desc">{capitalize(info.weather_description)}</p>)}
                    </div>
                    {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    <div className="right">
                        <p><ThermostatSharp fontSize='large'/>Min: {info.tempMin}&deg;C</p>
                        <p><ThermostatSharp fontSize='large'/>Max: {info.tempMax}&deg;C</p>
                        <Divider component="div" role="presentation"/>
                        <p><SevereColdSharp fontSize='large'/>Feels like: {info.feelsLike}&deg;C</p>
                    </div>
                </div>
                <Divider component="div" role="presentation"/>
                <div className='stats'>
                    <div className="stat-item">
                        <div className="stat-top">
                            <WaterDropTwoTone fontSize='large'/>
                            <span>Humidity</span>
                        </div>
                        <strong>{info.humidity}%</strong>
                    </div>

                    <div className="stat-item">
                        <div className="stat-top">
                            <AirSharp fontSize='large'/>
                            <span>Wind</span>
                        </div>
                        <strong>{info.windSpeed} km/h {info.windDirection}</strong>
                    </div>

                    <div className="stat-item">
                        <div className="stat-top">
                            <Visibility fontSize='large'/>
                            <span>Visibility</span>
                        </div>
                        <strong>{info.visibility} km</strong>
                    </div>

                    <div className="stat-item">
                        <div className="stat-top">
                            <Cloud fontSize='large'/>
                            <span>Cloud</span>
                        </div>
                        <strong>{info.cloud}%</strong>
                    </div>
                </div>
                <Divider component="div" role="presentation"/>
                <div className='extra'> 
                <p><Speed fontSize='large'/>Pressure: <b>{info.pressure} hPa</b></p>
                    <Divider orientation="vertical" variant="middle" flexItem />
                <p><WbTwilight fontSize='large'/>Sunrise: <b>{info.sunrise}</b></p>
                    <Divider orientation="vertical" variant="middle" flexItem />
                <p><SunnySnowing  fontSize='large'/>Sunset: <b>{info.sunset}</b></p>
                </div>
            </div>
        </div>
    )
}