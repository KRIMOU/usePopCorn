import React, { useState } from 'react'
import Star from '../Star'
const ContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
}
const starContainerStyle = {
  display: 'flex',
  gap: '1rem',
}

export default function StarRating({ maxRating = 5, color, size = 48 }) {
  const [stars, setStars] = useState(0)
  const [tempRating, setTempRating] = useState(0)
  const textStyle = {
    lineHeight: '1',
    color: color,
    fontSize: size,
    margin: '0 0 0 0.5rem',
  }

  return (
    <div style={ContainerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={i}>
            <Star
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              key={i}
              onRate={() => setStars(i + 1)}
              full={tempRating ? i + 1 <= tempRating : i + 1 <= stars}
            />
          </span>
        ))}
      </div>
      <p>{stars}</p>
    </div>
  )
}
