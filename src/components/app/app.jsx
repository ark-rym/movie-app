import React, { Component } from 'react'
import { Alert, Tabs } from 'antd'

import MovieService from '../../services/movie-service'
import { SearchPanel } from '../SearchPanel'
import { MovieList } from '../MovieList'
import { AppPagination } from '../AppPagination'
import { MovieContext } from '../MovieContext'

import './App.scss'

const { TabPane } = Tabs

export default class App extends Component {
  MovieService = new MovieService()

  state = {
    items: [],
    loading: false,
    error: false,
    inputValue: 'g',
    currentPage: 1,
    notFound: false,
    totalPage: 0,
    localStorageData: [],
    isRated: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue || prevState.currentPage !== this.state.currentPage) {
      this.getMovies(this.state.currentPage, this.state.inputValue)
    }
  }

  getMovies = (page, str) => {
    this.MovieService.getMoviesList(page, str)
      .then((movie) => {
        this.setState({
          items: movie.results,
          loading: false,
          notFound: !movie.results.length,
          totalPage: movie.total_pages,
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  onInputChange = (value) => {
    this.setState({
      inputValue: value,
      loading: true,
      currentPage: 1,
      notFound: 1,
    })
  }

  onPageChange = (page) => {
    this.setState({
      loading: true,
    })
    this.MovieService.getMoviesList(page, this.state.inputValue).then((res) => {
      this.setState({
        items: res.results,
        currentPage: page,
        loading: false,
      })
    })
  }

  toLocalStorage = (value, id) => {
    if (value) {
      const ratedData = this.state.items.reduce((acc, obj) => {
        if (obj.id === id) {
          obj.voteStars = value
          acc.push(obj)
        }
        return acc
      }, [])
      localStorage.setItem(id, JSON.stringify(ratedData))
    } else {
      localStorage.removeItem(id)
      this.setState(({ localStorageData }) => localStorageData.filter((obj) => obj.id !== id))
    }
  }

  fromLocalStorage = () => {
    const data = []
    const keys = Object.keys(localStorage)
    for (const key of keys) {
      data.push(...JSON.parse(localStorage.getItem(key)))
    }
    return data
  }

  onRated = (key) => {
    if (Number(key) !== 1) {
      this.setState({
        isRated: true,
        localStorageData: this.fromLocalStorage(),
      })
    } else {
      this.setState({
        isRated: false,
      })
    }
  }

  render() {
    const { items, loading, error, inputValue, notFound, totalPage, currentPage, isRated } = this.state

    return (
      <MovieContext>
        <div className="movie-app">
          <Tabs className="tabs" defaultActiveKey="1" onChange={this.onRated}>
            <TabPane tab="Search" key="1" />
            <TabPane tab="Rated" key="2" />
          </Tabs>
          {!isRated ? <SearchPanel inputValue={inputValue} onInputChange={this.onInputChange} /> : null}

          {notFound && !loading ? (
            <Alert className="alert" message="Not found" type="warning" />
          ) : (
            <MovieList
              data={items}
              loading={loading}
              error={error}
              toLocalStorage={this.toLocalStorage}
              fromLocalStorage={this.fromLocalStorage}
              isRated={isRated}
            />
          )}

          <AppPagination
            totalPage={totalPage}
            currentPage={currentPage}
            pageChange={this.onPageChange}
            isRated={isRated}
          />
        </div>
      </MovieContext>
    )
  }
}
