import './index.css'
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setPattern] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('info')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (ev) => {
    setNewName(ev.target.value)
  }

  const handleNumberChange = (ev) => {
    setNewNumber(ev.target.value)
  }

  const handlePatternChange = (ev) => {
    setPattern(ev.target.value)
  }

  const personsToShow = persons.filter(
    p => p.name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase())
  )

  const messageTimeOut = 4321

  function inform(text, infoClass) {
    setMessageClass(infoClass)
    setInfoMessage(text)
    setTimeout(() => {
      setInfoMessage(null)
    }, messageTimeOut)
  }

  const addPerson = (ev) => {
    ev.preventDefault()

    const foundPerson = persons.find(p => p.name === newName)

    if (foundPerson) {
      if (foundPerson.number === newNumber) {
        window.alert(`${newName} with number ${newNumber} is already in the phonebook`)
      } else if (window.confirm(`${newName} is already in the phonebook, replace the number with ${newNumber}?`)) {
        const changedPerson = { ...foundPerson, number: newNumber }
        personService
          .update(foundPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))

            inform(`New number for ${changedPerson.name} is ${changedPerson.number}`, 'info')

            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            inform(`Information of ${newName} was already deleted from server`, 'error')
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    } else if (newName) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          inform(`Added ${personObject.name}`, 'info')

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          inform(error.response.data.error, 'error')
          console.log(error.response.data)

          setNewName('')
          setNewNumber('')
        })
    } else {
      window.alert(`name cannot be empty`)
    }
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(() => {
        inform(`Information of ${person.name} was already deleted from server`, 'error')
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={infoMessage} messageClass={messageClass} />

      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} remove={removePerson} />
    </div>
  )
}

export default App
