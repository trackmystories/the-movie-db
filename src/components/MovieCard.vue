<template>
  <div class="movie-card">
    <h1>{{ movie.title }}</h1>

    <img :src="movieImageUrl" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <p><b>popularity :</b> {{ movie.popularity }}</p>
      <p><b>PG 18 : </b>{{ movie.adult }}</p>
      <p><b>Release Date :</b> {{ movie.releaseDate }}</p>
      <p><b>Rating :</b> {{ movie.voteAverage }}</p>
      <p><b>Vote Count : </b> {{ movie.voteCount }}</p>
    </div>
    <button v-if="showCardClickButton" @click="handleCardClick" class="click-card">
      {{ clickCard }}
    </button>
    <button
      :class="['favorite-button', isFavorite ? 'favorite' : 'non-favorite']"
      @click="toggleFavorite"
    >
      {{ isFavorite ? 'Unmark Favorite' : 'Mark as Favorite' }}
    </button>

    <div v-if="note" class="note">
      <p><b>Note : </b> {{ note }}</p>
    </div>
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
    onCardClick: Function,
    clickCard: String,
    showCardClickButton: {
      type: Boolean,
      default: true
    },
    note: {
      type: String,
      default: ''
    }
  },
  computed: {
    movieImageUrl() {
      return `https://image.tmdb.org/t/p/w342${this.movie.posterPath}`
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.movie)
    },
    handleCardClick() {
      this.$emit('card-clicked', this.movie.id)
    }
  }
}
</script>

<style scoped>
.movie-card {
  width: 320px;
  padding: 10px;
  display: flex;
  flex-direction: column;
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

.click-card {
  font-size: 1rem;
  color: #fff;
  background-color: #6cb4ee;
  border: none;
  border-radius: 2px;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 10px;
}

.favorite-button {
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
}

.favorite-button.favorite {
  background-color: orange;
}

.favorite-button.non-favorite {
  background-color: green;
}

.note {
  padding: 4px;
  margin-top: 2px;
  border: 0.5px solid #333;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  border-radius: 5px;
}
</style>
