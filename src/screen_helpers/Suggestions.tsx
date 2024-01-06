import React from 'react'

const Suggestions = ({suggestionList, buttonfunction}) => {
  return(
    <div className="suggestions">
    {suggestionList.map(r => (
      <button key={r} onClick={buttonfunction}>

        {r}
      </button>
    ))}
  </div>
  )
}

export default Suggestions;
