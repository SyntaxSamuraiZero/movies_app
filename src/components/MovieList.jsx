import React, { useContext } from 'react'
import { Spin, Alert } from 'antd'
import { parseISO, format } from 'date-fns'
import { ru } from 'date-fns/locale'

import GenresContext from '../context/GenresContext'
import MovieRating from '../components/MovieRating'
import getBorderColor from '../utils/getBorderColor'
import truncateDescription from '../utils/truncateDescription'
import plaiceholder from '../assets/images/Plaiceholder.png'

export default function MovieList({ items, loading, error, totalResults }) {
  const { genres } = useContext(GenresContext)

  const idList = genres.reduce((acc, item) => {
    acc[item.id] = item.name
    return acc
  }, {})

  if (error) {
    return (
      <div className="error">
        <Alert message="Error" description={error.message} type="error" showIcon />
      </div>
    )
  } else if (loading) {
    return (
      <div className="spin">
        <Spin size="large" spinning={loading} />
      </div>
    )
  } else if (!items || totalResults === 0) {
    return (
      <div className="info">
        <Alert message="Info" description="По запросу ничего не найдено." type="info" showIcon />
      </div>
    )
  } else {
    return (
      <section className="main__movie-list">
        <ul className="list">
          {items.map((item) => (
            <li className="list__item" key={item.id}>
              <div className="list__item-container">
                <div className="list__item-title-container">
                  <h2 className="list__item-title">{truncateDescription(item.title, 28)}</h2>
                  <span
                    className="list__item-vote-average"
                    style={{
                      border: `2px solid ${getBorderColor(item.vote_average)}`,
                    }}
                  >
                    {item.vote_average ? item.vote_average.toFixed(1) : 0}
                  </span>
                </div>

                <span className="list__item-release">
                  {item.release_date
                    ? format(parseISO(item.release_date), 'LLLL d, yyyy', { locale: ru })
                    : 'Date not specified'}
                </span>

                <div className="list__item-genre-container">
                  {item.genre_ids
                    ? item.genre_ids.map((id) => (
                        <span key={id} className="list__item-genre">
                          {idList[id]}
                        </span>
                      ))
                    : ''}
                </div>

                <p className="list__item-overview">
                  {item.overview ? truncateDescription(item.overview, 155) : 'Description not specified'}
                </p>

                <MovieRating movieId={item.id} />
              </div>
              {item.poster_path ? (
                <img
                  className="list__item-poster"
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  data-src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt="poster"
                  onLoad={(e) => {
                    e.target.src = e.target.getAttribute('data-src')
                  }}
                />
              ) : (
                <img className="list__item-plaiceholder" src={plaiceholder} alt="plaiceholder" />
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
