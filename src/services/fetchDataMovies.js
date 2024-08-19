export default async function fetchDataMovies({
  apiKey,
  options,
  setItems,
  setLoading,
  setError,
  debouncedQuery,
  pageSearch,
  setTotalPages,
  setTotalResults,
}) {
  setLoading(true)
  setError(null)

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(debouncedQuery)}&include_adult=false&language=ru-RU&page=${pageSearch}`,
      options
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    setItems(result.results)
    setTotalPages(result.total_pages)
    setTotalResults(result.total_results)
  } catch (error) {
    setError(error)
  } finally {
    setLoading(false)
  }
}
