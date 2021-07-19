import React, { useState } from 'react';

const Button = ({ handleClick, text }) =>
(
    <button onClick={handleClick}>{text}</button>
)

const Header = ({text}) => <h2>{text}</h2>

const StatRow = ({text, value, extra}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const feedbackText = 'Give feedback'
    const statText = 'Statistics'

    const textGood = 'Good'
    const textNeutral = 'Neutral'
    const textBad = 'Bad'
    const textAll = 'All'
    const textAverage = 'Average'
    const textPositive = 'Positive'

    const sum = props.good + props.neutral + props.bad

    if (sum === 0) {
        return (
            <div>
                <Header text={feedbackText} />

                <Button handleClick={props.handleGoodClick} text={textGood} />
                <Button handleClick={props.handleNeutralClick} text={textNeutral} />
                <Button handleClick={props.handleBadClick} text={textBad} />

                <Header text={statText} />

                <p>No feedback given</p>
            </div>
        )
    }

    const average = (props.good - props.bad) / sum
    const positive = props.good * 100 / sum

    return (
        <div>
            <Header text={feedbackText} />

            <Button handleClick={props.handleGoodClick} text={textGood} />
            <Button handleClick={props.handleNeutralClick} text={textNeutral} />
            <Button handleClick={props.handleBadClick} text={textBad} />

            <Header text={statText} />

            <table>
                <tbody>
                    <StatRow text={textGood} value={props.good} />
                    <StatRow text={textNeutral} value={props.neutral} />
                    <StatRow text={textBad} value={props.bad} />
                    <StatRow text={textAll} value={sum} />
                    <StatRow text={textAverage} value={average.toFixed(2)} />
                    <StatRow text={textPositive} value={(positive.toFixed(2).toString() + ' %')} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            handleGoodClick={handleGoodClick}
            handleBadClick={handleBadClick}
            handleNeutralClick={handleNeutralClick}
        />
    )
}

export default App;
