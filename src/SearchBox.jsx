import "./SearchBox.css"
import { useState } from 'react';
import { getWeatherInfo } from "./WeatherInfo"
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

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
                <Paper sx={{ p: '2px 4px',
                        display: 'flex', alignItems: 'center', width: 400,
                        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Translucent white
                        borderRadius: 7, // More rounded corners (default is 1 for Paper)
                        backdropFilter: 'blur(10px)', // Frosted glass effect
                        // Add a subtle shadow to enhance depth for the translucent effect
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',}}>
                    <InputBase sx={{ ml: 1, flex: 1 }}
                            placeholder="Enter City Name..." id="city" required value={city} onChange={handleChange}
                            inputProps={{ 'aria-label': 'Enter City Name...' }}/>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>

                {error && <p style={{color: "red"}}>City not found!</p>}
            </form>
        </div>
    )
}