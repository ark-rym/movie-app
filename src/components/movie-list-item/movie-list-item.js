import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import { Context } from '../movie-context/movie-context'

import './movie-list-item.css'

const MovieListItem = ({ data, toLocalStorage, id }) => {
  const imgUrl = data.poster_path ? 'https://image.tmdb.org/t/p/w500' : ''

  const date = format(data.release_date ? new Date(data.release_date) : new Date(), 'MMMM d, y')
  const getRate = JSON.parse(localStorage.getItem(id))

  const genreList = React.useContext(Context)

  const searchGenre = (genres, movieGenres) => {
    const genreFilter = genres.filter((el) => movieGenres.includes(el.id))
    return genreFilter.map((el) => el.name)
  }

  const foundGenres = searchGenre(genreList, data.genre_ids)

  const genre = foundGenres.map((item) => {
    return (
      <span className="movie-card_genre_item" key={item}>
        {item}
      </span>
    )
  })

  const handleChange = (value) => {
    toLocalStorage(value, id)
  }

  const movieVote = data.vote_average
  let voteColor = 'color_'
  if (movieVote < 3) {
    voteColor += 'E90000'
  } else if (movieVote >= 3 && movieVote < 5) {
    voteColor += 'E97E00'
  } else if (movieVote >= 5 && movieVote < 7) {
    voteColor += 'E9D100'
  } else {
    voteColor += '#66E900'
  }

  const cutText = (str) => {
    const arr = str.split(' ')
    arr.splice(25)
    return `${arr.join(' ')} ...`
  }

  const text = cutText(data.overview)

  const voteClass = `movie-card_vote ${voteColor}`

  return (
    <div className="movie-card">
      <div className="movie-card_picture">
        <img src={`${imgUrl}${data.poster_path}`} alt={data.original_title} />
      </div>
      <div className="movie-card_info">
        <div className="movie-card_header">
          <h5 className="mivie-card_title">{data.original_title}</h5>
          <div className={voteClass}>{data.vote_average}</div>
        </div>

        <span className="mivie-card_release_date">{date}</span>
        <div className="movie-card_genre">{genre}</div>
        <div className="movie-card_overview">
          <p className="movie-card_overview_text">{text}</p>
        </div>
        <span className="rate">
          <Rate
            className="rate-stars"
            onChange={handleChange}
            count={10}
            defaultValue={getRate && getRate[0]?.voteStars}
          />
        </span>
      </div>
    </div>
  )
}

export default MovieListItem
