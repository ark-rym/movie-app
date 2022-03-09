export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = '1e5f27734f64b3a0fc1ad0fe5f11167f'

  async getResourse(url1, url2) {
    const _apiFinal = url2
      ? `${this._apiBase}${url1}?api_key=${this._apiKey}${url2}`
      : `${this._apiBase}${url1}?api_key=${this._apiKey}`

    // const res = await fetch(`${this._apiBase}${url1}?api_key=${this._apiKey}${url2}`)
    const res = await fetch(_apiFinal)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url2}, receved ${res.status}`)
    }
    return await res.json()
  }

  async getMoviesList(page, str) {
    const res = await this.getResourse('/search/movie', `&page=${page}&query=${str}`)
    return res
  }

  async getGenreList() {
    const res = await this.getResourse('/genre/movie/list')
    return res.genres
  }
}

// const movies = new MovieService()

// movies.getGenreList().then((data) => {
//   console.log(data)
// })

// const movies = new MovieService()
// movies.getMoviesList(1, 'sp').then((data) => {
//   console.log(data.total_pages);
//   // movie.forEach(element => {
//   //   console.log(element.original_title)
//   // });
// })

// const movies = new MovieService()
// movies.getGenreList().then((movie) => {
//   console.log(movie);
//   // movie.forEach(element => {
//   //   console.log(element.original_title)
//   // });
// })
