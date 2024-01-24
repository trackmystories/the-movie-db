<template>
  <div id="movie-list-container">
    <movie-filter-sort @filter-sort-changed="handleFilterSortChange"></movie-filter-sort>
    <movie-search @search-applied="handleSearch"></movie-search>

    <h1>Movie List</h1>
    <ul v-if="movies.length">
      <li class="li" v-for="movie in movies" :key="movie.id">
        <movie-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          :is-favorite="isFavorite(movie)"
          @toggle-favorite="toggleFavorite"
          :release-date="movie.release_date"
          :rating="movie.vote_average"
          :show-summary="true"
          :on-card-click="handleCardClick"
        />
      </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreMovies">Load More</button>
    <p v-else>Loading movies...</p>
  </div>
</template>

<script>
import MovieSearch from '../components/MovieSearch.vue'
import MovieFilterSort from '../components/MovieFilterSort.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'MovieList',
  components: {
    MovieSearch,
    MovieFilterSort,
    MovieCard
  },
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
    fetchMovies(genre = '', sort = '') {
      const apiKey = '9378bcf55958be3e4ed2a54ec277b1c7'
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=${this.currentPage}`

      if (genre) {
        url += `&with_genres=${encodeURIComponent(genre)}`
      }

      if (sort) {
        url += `&sort_by=${encodeURIComponent(sort)}`
      }

      fetch(url, {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
        .then((res) => res.json())
        .then((json) => {
          this.movies = json.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average
          }))
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
    },

    handleSearch(searchQuery) {
      this.currentPage = 1
      this.movies = []
      this.fetchMovies(searchQuery)
    },

    handleFilterSortChange(filterSortData) {
      this.currentPage = 1
      this.movies = []
      this.fetchMovies(filterSortData.genre, filterSortData.sort)
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
#movie-list-container .li {
  list-style-type: none;
}
</style>
