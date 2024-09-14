import React from 'react'
import Movie from '../Movie/Movie'

export default function MoviesList({ movies }) {
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  )
}
