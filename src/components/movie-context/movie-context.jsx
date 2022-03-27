import React from 'react'

import MovieService from '../../services/movie-service'

export const Context = React.createContext()

export default class MovieContext extends React.Component {
  state = {
    genres: [],
  }

  componentDidMount() {
    this.getGenres()
  }

  MovieService = new MovieService()

  getGenres = () => {
    this.MovieService.getGenreList().then((data) => {
      this.setState({
        genres: [...data],
      })
    })
  }

  render() {
    return <Context.Provider value={this.state.genres}>{this.props.children}</Context.Provider>
  }
}
