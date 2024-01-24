<template>
  <div class="movie-card">
    <img :src="movieImageUrl" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <p>Release Date: {{ movie.releaseDate }}</p>
      <p>Rating: {{ movie.voteAverage }}</p>
    </div>
    <button :style="favoriteButtonStyle" @click="toggleFavorite">
      {{ isFavorite ? 'Unmark Favorite' : 'Mark as Favorite' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
    isFavorite: Boolean,
    showSummary: Boolean,
    releaseDate: String,
    rating: Number,
    onCardClick: Function
  },
  computed: {
    movieImageUrl() {
      return `https://image.tmdb.org/t/p/w300${this.movie.poster_path}`
    },
    favoriteButtonStyle() {
      return {
        backgroundColor: this.isFavorite ? 'green' : 'orange',
        color: 'white',
        padding: '10px',
        border: 'none',
        cursor: 'pointer'
      }
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.movie)
    }
  }
}
</script>

<style scoped>
.movie-card {
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-info {
  margin-top: 10px;
}
</style>
