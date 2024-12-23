import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [currentWeather, setCurrentWeather] = useState({})
    const [city, setCity] = useState(null)
    const [confirmed, setConfirmed] = useState(false)

    const cityInputHandler = (e) => {
        setCity(e.target.value)
    }

    const confirmHandler = () => {
        setConfirmed(true)
    }

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=6bb5c32d61484f9387d200901241712&q=${city}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setCurrentWeather(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [confirmed, city]);

    return (
        <>
            {confirmed ? (
                currentWeather.current && currentWeather.location ? (
                    <>
                        <h1>{`${currentWeather.location.name}, ${currentWeather.location.country}`}</h1>
                        <h2>{currentWeather.current.temp_c} °C</h2>
                        <p>Feels Like: {currentWeather.current.feelslike_c} °C</p>
                        <figure style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <p>{currentWeather.current.condition.text}</p>
                            <img src={currentWeather.current.condition.icon} alt="weather-icon"/>
                        </figure>
                        <p>Wind kph: {currentWeather.current.wind_kph}</p>
                        <p>Last Updated: {currentWeather.current.last_updated}</p>
                    </>
                ) : null
            ) : (
                <>
                    <h1>Enter a City!</h1>
                    <input onChange={cityInputHandler} type={"text"} />
                    <button onClick={confirmHandler}>Confirm</button>
                </>
            )}

        </>
    )
};

export default App
