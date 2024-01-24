<template>
  <div id="fav-container">
    <h1>Favorite Movies</h1>
    <ul v-if="favorites.length">
      <li v-for="favorite in favorites" :key="favorite.movie.id">
        <img :src="'https://image.tmdb.org/t/p/w500' + favorite.movie.poster_path" alt="Poster" />
        <h2>{{ favorite.movie.title }}</h2>
        <p>Comment: {{ favorite.note }}</p>
        <button
          :style="favoriteButtonStyle(favorite.movie)"
          @click="toggleFavorite(favorite.movie)"
        >
          {{ isFavorite(favorite.movie) ? 'Unmark Favorite' : 'Mark as Favorite' }}
        </button>
        <p>Note: {{ favorite.note }}</p>
      </li>
    </ul>
    <p v-else>No favorites added yet.</p>
  </div>
</template>

<script>
export default {
  name: 'FavView',
  data() {
    return {
      favorites: []
    }
  },
  mounted() {
    this.fetchFavorites()
  },
  methods: {
    fetchFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      this.favorites = Object.values(favorites)
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
</style>
