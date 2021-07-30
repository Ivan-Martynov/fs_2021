import React from 'react'

const Filter = ({ pattern, handlePatternChange }) => {
    return (
        <div>
            find countries <input value={pattern} onChange={handlePatternChange} />
        </div>
    )
}

export default Filter