import { useState, useEffect } from 'react'
import MoviesList from './MoviesList'
import MovieStats from './MovieStats'
import Navbar from './Navbar'
import Button from './Button'
import SearchResults from './SearchResults'
import Search from './Search'
import Movie from './Movie/Movie'

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

const KEY = '12c1fdba'
export default function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  /**
   * Adds a movie to the watched list.
   * @param {object} movie The movie to add.
   */
  const handleAddWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie])
  }

  /**
   * Fetches movies from the OMDB API based on a query string.
   * @return {Promise<void>} A promise that resolves when the movies have been fetched and set, or rejects if an error occurs.
   */
  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      try {
        setError(null)
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        )
        if (!res.ok) {
          console.log('Movie not found')
          throw new Error('Movie not found')
        }
        const data = await res.json()
        if (data.Response === 'False') {
          throw new Error('Movie not found')
        }
        setMovies(data.Search) //setMovies(data)
      } catch (err) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    if (query === '') {
      setMovies([])
      setError(true)
      return
    }
    fetchMovies()
  }, [query])
  /**
   * Filters the movies based on the user input.
   * @param {string} query The user input.
   */
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
        <Search query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </Navbar>
      <Main watched={watched}>
        <Box>
          {/* Display a loader while the movies are being fetched. */}
          {isLoading && <Loader />}
          {/* Display the movies list if there are movies and there is no error. */}
          {!isLoading && !error && (
            <MoviesList movies={movies} setSelectedId={setSelectedId} />
          )}
          {/* Display an error message if there is an error. */}
          {error && <Error message="Movie not found" />}
        </Box>
        <BoxWatched>
          {/* Display the movie details if a movie is selected. */}
          {selectedId ? (
            <MoviesDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              {/* Display the watched movies list if there are watched movies. */}
              <MovieStats watched={watched} />

              <WatchedMoviesList movies={watched} />
            </>
          )}
        </BoxWatched>
      </Main>
    </>
  )
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function MoviesDetails({ selectedId, setSelectedId, onAddWatched }) {
  const [movie, setMovie] = useState({})
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    ImdbRating: imdbRating,
    Plot: plot,
    Released: released,
  } = movie

  useEffect(
    function () {
      async function fetchMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        )
        const data = await res.json()
        setMovie(data)
      }

      fetchMovie()
    },
    [selectedId]
  )

  const handleAddWatched = (movie) => {
    const newWatched = []
    onAddWatched(movie)
  }

  return (
    <div id="details">
      <header>
        <button className="btn-back">&larr;</button>
        <img src={poster} alt="" />
        <div className="details-overview">
          <button
            className="btn-add"
            onClick={(movie) => handleAddWatched(movie)}
          />
          <h2>{title}</h2>
          <p>{released} &bull</p>
        </div>
      </header>{' '}
      <button className="btn-back" onClick={() => setSelectedId(null)}>
        &larr;
      </button>
      {selectedId}
    </div>
  )
}

function Error({ message }) {
  return <p className="loader">{message}</p>
}

function WatchedMoviesList({ movies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          clickMovie={() => console.log(movie)}
        />
      ))}
    </ul>
  )
}
