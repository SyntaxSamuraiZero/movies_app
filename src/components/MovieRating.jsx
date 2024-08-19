import { Rate } from 'antd'
import { useEffect, useState } from 'react'

import postRating from '../services/postRating'

export default function MovieRating({ movieId }) {
  const [rating, setRating] = useState(null)

  useEffect(() => {
    function init() {
      const storedRating = localStorage.getItem(`${movieId}`)
      if (storedRating) {
        setRating(parseInt(storedRating))
      }
    }
    init()
  }, [movieId])

  return (
    <Rate
      className="list__item-rate"
      value={rating}
      onChange={(value) => {
        setRating(value)
        if (value > 0) {
          localStorage.setItem(`${movieId}`, value)
          postRating(movieId, value)
        } else {
          localStorage.removeItem(`${movieId}`)
        }
      }}
      count={10}
      allowHalf
    />
  )
}
