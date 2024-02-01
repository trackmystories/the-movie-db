<template>
  <div id="movie-list-container">
    <movie-filter-sort @filter-sort-changed="handleFilterSortChange"></movie-filter-sort>

    <h1>Movie List</h1>
    <div v-if="movies.length">
      <div class="movie-item" v-for="movie in movies" :key="movie.id">
        <movie-card
          :movie="movie"
          :is-favorite="isFavorite(movie)"
          @toggle-favorite="toggleFavorite"
          :release-date="movie.releaseDate"
          :rating="movie.voteAverage"
          :show-summary="true"
          @card-clicked="handleCardClick"
          :clickCard="'click to view details screen'"
          :showCardClickButton="true"
        />
      </div>
    </div>
    <button class="loadmore" v-if="currentPage < totalPages" @click="loadMoreMovies">
      Load More
    </button>
    <p v-else>Loading movies...</p>
  </div>
</template>

<script>
import MovieFilterSort from '../components/MovieFilterSort.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'MovieList',
  components: {
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
      console.log('Fetching movies with Genre:', genre, 'Sort:', sort)
      const apiKey = '9378bcf55958be3e4ed2a54ec277b1c7'
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWZiOWU0MzEwZTU3MmQ0NTY0Y2NjMjU1ZDI2NzMyMiIsInN1YiI6IjY1NTM1MjM1ZDRmZTA0MDEzOTgxMjVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEYYvydoCUUJgTR7eskapz3sGiU-Y8gjzE9nmJMXOdE'

      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=${this.currentPage}`
      console.log('Constructed URL:', url)
      if (genre) {
        console.log('genre', genre)
        url += `&with_genres=${encodeURIComponent(genre)}`
      }

      if (sort) {
        let apiSortParam = sort.replace('rating.', 'vote_average.')
        console.log('apiSortParam', apiSortParam)
        url += `&sort_by=${encodeURIComponent(apiSortParam)}`
      }

      fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('Fetched Movies:', json.results)
          this.movies = this.movies.concat(
            json.results.map((movie) => ({
              id: movie.id,
              title: movie.title,
              releaseDate: movie.release_date,
              voteAverage: movie.vote_average,
              posterPath: movie.poster_path,
              overview: movie.overview,
              adult: movie.adult,
              backdropPath: movie.backdrop_path,
              genreIds: movie.genre_ids,
              originalLanguage: movie.original_language,
              originalTitle: movie.original_title,
              popularity: movie.popularity,
              video: movie.video,
              voteCount: movie.vote_count
            }))
          )
          this.totalPages = json.total_pages
        })
        .catch((err) => {
          console.error('Fetch Movies Error:', err)
        })
    },

    toggleFavorite(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      console.log('Favorites before update:', favorites)
      if (favorites[movie.id]) {
        delete favorites[movie.id]
      } else {
        let note = prompt('Add a note for this movie:')
        favorites[movie.id] = { movie, note }
      }

      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.updateFavorites()
      console.log('Favorites after update:', favorites)
    },

    updateFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      this.favorites = Object.values(favorites)
      console.log('Object.values(favorites)', Object.values(favorites))
      console.log('Updating favorites:', favorites)
    },

    fetchFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      console.log('Fetched favorites:', favorites)
      this.favorites = Object.values(favorites)
    },

    isFavorite(movie) {
      return this.favorites.some((fav) => fav && fav.movie && fav.movie.id === movie.id)
    },

    favoriteButtonStyle(movie) {
      return {
        backgroundColor: this.isFavorite(movie) ? 'green' : 'orange',
        color: 'white'
      }
    },

    loadMoreMovies() {
      if (this.currentPage < this.totalPages) {
        console.log('Loading more movies. Current page:', this.currentPage)
        this.currentPage++
        this.fetchMovies()
      }
    },

    handleFilterSortChange(filterSortData) {
      console.log('Handling filter/sort change:', filterSortData)
      this.currentPage = 1
      this.movies = []
      this.fetchMovies(filterSortData.genre, filterSortData.sort)
    },
    handleCardClick(movieId) {
      this.$router.push({ path: `/movie/${movieId}` })
    }
  },
  mounted() {
    console.log('Component mounted. Fetching initial movies and favorites.')
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

#movie-list-container .movie-item {
  width: 100%;
}

.loadmore {
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  width: 100%;
  background-color: #333;
}
</style>
