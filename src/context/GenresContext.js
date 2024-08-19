import React, { createContext, useState, useEffect } from 'react'

const GenresContext = createContext()
let requestMade = false

export function GenresProvider({ children, setError }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
      const apiKey = process.env.REACT_APP_API_KEY

      try {
        if (!requestMade) {
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`,
            options
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const result = await response.json()
          setGenres(result.genres)
          requestMade = true
        }
      } catch (error) {
        setError(error)
      }
    }

    fetchGenres()
  }, [children, setError])

  return <GenresContext.Provider value={{ genres }}>{children}</GenresContext.Provider>
}

export default GenresContext
