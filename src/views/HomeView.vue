<template>
  <div id="movie-list-container">
    <h1>Movie List</h1>
    <ul v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id">
        <h2>{{ movie.title }}</h2>
        <p>Release Date: {{ movie.releaseDate }}</p>
        <p>Rating: {{ movie.voteAverage }}</p>
        <button :style="favoriteButtonStyle(movie)" @click="toggleFavorite(movie)">
          {{ isFavorite(movie) ? 'Unmark Favorite' : 'Mark as Favorite' }}
        </button>
        <p v-if="isFavorite(movie)">Note: {{ getFavorite(movie).note }}</p>
      </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreMovies">Load More</button>
    <p v-else>Loading movies...</p>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
      favorites: [],
      currentPage: 1,
      pageSize: 20,
      totalPages: 0
    }
  },
  methods: {
    fetchMovies() {
      const apiKey = '9378bcf55958be3e4ed2a54ec277b1c7'
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.currentPage}&sort_by=popularity.desc&api_key=${apiKey}`

      fetch(url, {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
        .then((res) => res.json())
        .then((json) => {
          this.movies.push(
            ...json.results.map((movie) => ({
              id: movie.id,
              title: movie.title,
              releaseDate: movie.release_date,
              voteAverage: movie.vote_average
            }))
          )
          this.totalPages = json.total_pages
        })
        .catch((err) => console.error('error:' + err))
    },

    toggleFavorite(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      if (favorites[movie.id]) {
        delete favorites[movie.id] // Remove from favorites
      } else {
        let note = prompt('Add a note for this movie:')
        favorites[movie.id] = { movie, note }
      }

      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.updateFavorites()
    },

    updateFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      this.favorites = Object.values(favorites)
    },

    fetchFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      this.favorites = Object.values(favorites)
    },

    isFavorite(movie) {
      return this.favorites.some((fav) => fav.movie.id === movie.id)
    },

    getFavorite(movie) {
      return this.favorites.find((fav) => fav.movie.id === movie.id)
    },

    favoriteButtonStyle(movie) {
      return {
        backgroundColor: this.isFavorite(movie) ? 'green' : 'orange',
        color: 'white'
      }
    },
    loadMoreMovies() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchMovies()
      }
    }
  },
  mounted() {
    this.fetchMovies()
    this.fetchFavorites()
  }
}
</script>

<style scoped>
#movie-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px;
}
</style>
