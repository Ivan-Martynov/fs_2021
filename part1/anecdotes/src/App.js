import React, { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({ handleClick, text }) =>
(
    <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({header, anecdote, points}) => {
    return (
        <>
            <Header text={header} />

            <p>{anecdote}</p>
            <p>has {points} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
    ]

    const [selected, setSelected] = useState(0)

    const [points, setPoints] = useState(Array.apply(
        null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

    const handleSelectClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const handleVoteClick = () => {
        const copy = [...points]
        copy[selected]++
        setPoints(copy)
    }

    let maxIndex = 0
    let maxValue = 0
    for (let i = 0; i < points.length; i++) {
        if (points[i] > maxValue) {
            maxValue = points[i]
            maxIndex = i
        }
    }

    return (
        <div>
            <Anecdote header='Anecdote of the day' anecdote={anecdotes[selected]} points={points[selected]} />
            
            <Button handleClick={handleVoteClick} text='vote' />
            <Button handleClick={handleSelectClick} text='next anecdote' />

            <Anecdote header='Anecdote with most notes' anecdote={anecdotes[maxIndex]} points={points[maxIndex]} />
        </div>
    )
}

export default App