import React from 'react'
import { Spin, Alert } from 'antd'

import { MovieListItem } from '../MovieListItem'

import './MovieList.scss'

const MovieList = ({ data, loading, error, toLocalStorage, fromLocalStorage, isRated }) => {
  const viewData = isRated ? fromLocalStorage() : data

  const MovieItems = viewData.map((item) => {
    return (
      <li key={item.id} className="movie-list">
        <MovieListItem id={item.id} data={item} toLocalStorage={toLocalStorage} />
      </li>
    )
  })

  const hasDate = !(loading || error)

  const errorMessage = error ? <Alert message="Error Text" description="Error Description" type="error" /> : null
  const spinner = loading ? <Spin size="large" className="example" /> : null
  const content = hasDate ? MovieItems : null

  return (
    <div className="movies">
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

export default MovieList
