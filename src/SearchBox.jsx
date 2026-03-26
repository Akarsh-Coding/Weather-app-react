import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import { getWeatherInfo } from "./WeatherInfo"

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    
    let handleChange = (evt) => {
        setCity(evt.target.value);
    }
    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let newInfo = await getWeatherInfo(city);
            updateInfo(newInfo);
            console.log(newInfo);
            setCity("");
            setError(false);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit} action=""> 
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>   <br /><br />
                <Button  variant="contained" type='submit'>Search</Button>
                {error && <p style={{color: "red"}}>City not found!</p>}
            </form>
        </div>
    )
}