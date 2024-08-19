export default async function fetchRatedMovies({
  apiKey,
  options,
  setItems,
  setLoading,
  setError,
  pageRated,
  setTotalPages,
  setTotalResults,
}) {
  let guestSessionId = localStorage.getItem('guestSessionId')

  setLoading(true)
  setError(null)

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=ru-RU&page=${pageRated}&sort_by=created_at.asc`,
      options
    )

    if (response.status === 404) {
      alert('Вы ещё не оценили ни одного фильма. Пожалуйста, добавьте оценки и попробуйте снова.')
    }

    if (response.ok) {
      const result = await response.json()

      setItems(result.results)
      setTotalPages(result.total_pages)
      setTotalResults(result.total_results)
    } else {
      setItems([])
      setTotalPages(1)
      setTotalResults(null)
    }
  } catch (error) {
    setError(error)
  } finally {
    setLoading(false)
  }
}
