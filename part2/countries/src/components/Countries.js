import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(undefined)
    
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        const params = {
            access_key: api_key,
            query: country.capital
        }

        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => { setWeather(response.data) })
    }, [api_key, country.capital])


    if (weather) {
        return (
            <>
                <h2>Weather in {country.capital}</h2>
                <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
                <img src={weather.current.weather_icons[0]} width={100} alt={weather.current.weather_descriptions[0]} />
                <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </>
        )
    }

    return <></>
}

const Country = ({ country }) => {
    if (country) {
        return (
            <div>
                <h1>{country.name}</h1>

                <p>capital {country.capital}</p>
                <p>population {country.population}</p>

                <h2>languages</h2>

                <ul>
                    {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                </ul>

                <img src={country.flag} width={200} alt={country.name} />

                <Weather country={country} />
            </div>
        )
    }

    return <></>
}

const Countries = ({ countries, selected, handleSelectClick }) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }

    return (
        <div>
            <ul>
                {
                    countries.map(country =>
                        <li key={country.name}>
                            {country.name}
                            <button onClick={() => handleSelectClick(country)}>show</button>
                        </li>)
                }
            </ul>
            <Country country={selected} />
        </div>
    )
}

export default Countries