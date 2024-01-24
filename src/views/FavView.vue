<template>
  <div id="fav-container">
    <movie-search @search-applied="handleSearch"></movie-search>

    <h1>Favorite Movies</h1>
    <ul v-if="favorites.length">
      <li class="li" v-for="favorite in favorites" :key="favorite.movie.id">
        <movie-card
          :movie="favorite.movie"
          :is-favorite="isFavorite(favorite.movie)"
          @toggle-favorite="toggleFavorite"
          :release-date="favorite.movie.release_date"
          :rating="favorite.movie.vote_average"
          :show-summary="false"
        />
        <p>Note: {{ favorite.note }}</p>
      </li>
    </ul>
    <p v-else>No favorites added yet.</p>
  </div>
</template>

<script>
import MovieSearch from '../components/MovieSearch.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'FavView',
  components: {
    MovieSearch,
    MovieCard
  },
  data() {
    return {
      originalFavorites: [],
      favorites: [],
      searchQuery: ''
    }
  },
  mounted() {
    this.fetchFavorites()
  },
  methods: {
    fetchFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      this.originalFavorites = Object.values(favorites)
      this.favorites = this.originalFavorites
    },

    handleSearch(searchQuery) {
      this.searchQuery = searchQuery.toLowerCase()
      this.favorites = this.originalFavorites.filter((favorite) =>
        favorite.movie.title.toLowerCase().includes(this.searchQuery)
      )
    },

    favoriteButtonStyle(movie) {
      return {
        backgroundColor: this.isFavorite(movie) ? 'green' : 'orange',
        color: 'white',
        padding: '10px',
        margin: '10px',
        border: 'none',
        cursor: 'pointer'
      }
    },

    toggleFavorite(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      if (favorites[movie.id]) {
        delete favorites[movie.id]
      } else {
        let note = prompt('Add a note for this movie:')
        favorites[movie.id] = { movie, note }
      }

      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.fetchFavorites()
    },

    isFavorite(movie) {
      return this.favorites.some((fav) => fav.movie.id === movie.id)
    }
  }
}
</script>

<style scoped>
#fav-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

#fav-container .li {
  list-style-type: none;
}
</style>
