import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [pattern, setPattern] = useState('')
    const [selected, setSelected] = useState(undefined)

    const handleSelectClick = (country) => {
        setSelected(country)
    }

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => { setCountries(response.data) })
    }
    useEffect(hook, [])

    const handlePatternChange = (ev) => {
        setPattern(ev.target.value)
        setSelected(undefined)
    }

    const countriesToShow = countries.filter(
        contry => contry.name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase())
    )

    return (
        <div>
            <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
            <Countries countries={countriesToShow} selected={selected} handleSelectClick={handleSelectClick} />
        </div>
    )
}

export default App;
