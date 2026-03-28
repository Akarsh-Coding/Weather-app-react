import weatherImg from "./assets/weather.png";
import SearchBox from './SearchBox';
import {LightMode, NightsStay} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Divider } from "@mui/material";
import "./NavBar.css"



export default function NavBar({updateInfo, toggleTheme, theme, setTheme}){

    return(
        <>
        <div className="navbar">
            <div className="logo">
                <img src={weatherImg} alt="weather" />
                Weatherly
            </div>
            <SearchBox updateInfo={updateInfo}/>
            <div className="theme-toggle" >
                <IconButton onClick={() => setTheme("light")} className={theme==="light"?"active":""}>
                    <LightMode fontSize="large" />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton onClick={() => setTheme("dark")} className={theme === "dark"?"active":""}>
                    <NightsStay fontSize="large" />
                </IconButton>
            </div>
            </div>
        </>
    )
}