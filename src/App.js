import { useState } from 'react'
import MoviesList from './MoviesList'
import MovieStats from './MovieStats'
import Navbar from './Navbar'
import Button from './Button'
import SearchResults from './SearchResults'
import Search from './Search'

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
]

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]

export function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true)
  return (
    <div className="box">
      <Button onClickFunction={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? '–' : '+'}
      </Button>
      {children}
    </div>
  )
}

export function BoxWatched({ children }) {
  const [isOpen2, setIsOpen2] = useState(true)

  return (
    <div className="box">
      <Button onClickFunction={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? '–' : '+'}
      </Button>
      {isOpen2 && <>{children}</>}
    </div>
  )
}

export function Main({ children }) {
  return <main className="main">{children}</main>
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)

  const onTypeMovies = (query) => {
    if (query) {
      const filteredMovies = tempMovieData.filter((movie) => {
        return movie.Title.toLowerCase().includes(query.toLowerCase())
      })
      setMovies(filteredMovies)
    } else {
      setMovies(tempMovieData)
    }
  }
  return (
    <>
      <Navbar>
        <Search searchMovies={(query) => onTypeMovies(query)} />
        <SearchResults movies={movies} />
      </Navbar>
      <Main watched={watched}>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <BoxWatched>
          <MovieStats watched={watched} />
          <MoviesList movies={watched} />
        </BoxWatched>
      </Main>
    </>
  )
}
