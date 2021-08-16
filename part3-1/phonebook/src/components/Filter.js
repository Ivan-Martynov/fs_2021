import React from 'react'

const Filter = ({ pattern, handlePatternChange }) => {
  return (
    <div>
      filter shown with <input value={pattern} onChange={handlePatternChange} />
    </div>
  )
}

export default Filter