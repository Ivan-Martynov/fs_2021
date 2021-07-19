import React, { useState } from 'react'

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing buttons
            </div>
        )
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({ handleClick, text }) =>
(
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    const [counter, setCounter ] = useState(0)
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    const increment = () => setCounter(counter + 1)
    const decrement = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    console.log('rendering... ' + counter)

    return (
        <div>
            <Display counter={counter} />
            <Button handleClick={increment} text='plus' />
            <Button handleClick={setToZero} text='zero' />
            <Button handleClick={decrement} text='minus' />
            <br />
            {left}
            <Button handleClick={handleLeftClick} text='left' />
            <Button handleClick={handleRightClick} text='right' />
            {right}
            <History allClicks={allClicks} />
        </div>
    )
}

export default App
