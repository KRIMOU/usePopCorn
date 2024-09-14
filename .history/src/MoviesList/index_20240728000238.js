import React from 'react'
import Movie from '../Movie/Movie'

export default function MoviesList({ movies, setSelectedId }) {
  const clickMovie = (movie) => {
    console.log(movie)
    setSelectedId(movie.)
  }
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie
            key={movie.imdbID}
            movie={movie}
            clickMovie={(movie) => clickMovie(movie)}
          />
        ))}
      </ul>
    </>
  )
}
