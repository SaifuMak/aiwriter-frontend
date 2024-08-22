import React from 'react'

function LongArrow() {
  return (
    <svg
    width="100"
    height="10"
    viewBox="0 0 200 10"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <line x1="0" y1="5" x2="180" y2="5" stroke="white" strokeWidth="2" />
    <polygon points="180,0 200,5 180,10" fill="white" />
  </svg>
  )
}

export default LongArrow