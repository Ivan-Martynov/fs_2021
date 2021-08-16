import React from 'react'

const Person = ({ person, remove }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={remove}>delete</button>
    </li>
  )
}

const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} person={person} remove={() => remove(person.id)} />)}
    </ul>
  )
}

export default Persons