import React from 'react'

export default function Button({ children, onClickFunction }) {
  return (
    <button
      className="btn-toggle"
      onClick={() => onClickFunction((open) => !open)}>
      {children}
    </button>
  )
}
