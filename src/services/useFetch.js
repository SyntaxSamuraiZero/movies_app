import { useEffect } from 'react'

import fetchDataMovies from './fetchDataMovies'
import fetchRatedMovies from './fetchRatedMovies'

export default function useFetch(
  setItems,
  setLoading,
  setError,
  activeTab,
  debouncedQuery,
  pageSearch,
  pageRated,
  setTotalPages,
  setTotalResults
) {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }

    if (activeTab === '1') {
      fetchDataMovies({
        apiKey,
        options,
        setItems,
        setLoading,
        setError,
        debouncedQuery,
        pageSearch,
        setTotalPages,
        setTotalResults,
      })
    } else if (activeTab === '2') {
      fetchRatedMovies({
        apiKey,
        options,
        setItems,
        setLoading,
        setError,
        pageRated,
        setTotalPages,
        setTotalResults,
      })
    }
  }, [setItems, setLoading, setError, activeTab, debouncedQuery, pageSearch, pageRated, setTotalPages, setTotalResults])
}
