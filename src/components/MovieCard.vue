<template>
  <div
    class="p-4 border border-gray-300 rounded-lg shadow-sm max-w-sm mx-auto my-4 sm:max-w-md md:max-w-lg"
  >
    <h1 class="text-xl font-semibold">
      Movie Details
      <span @click="handleCardClick" class="text-blue-600 cursor-pointer">{{ clickCard }}</span>
    </h1>
    <img :src="movieImageUrl" alt="Movie Poster" class="w-full h-auto rounded-md" />

    <div class="mt-4">
      <h3 class="text-lg font-medium">{{ movie.title }}</h3>
      <p>Release Date: {{ movie.releaseDate }}</p>
      <p>Rating: {{ movie.voteAverage }}</p>
    </div>
    <button
      :class="[
        'mt-4 px-4 py-2 rounded text-white font-medium',
        isFavorite ? 'bg-green-500' : 'bg-orange-500'
      ]"
      @click="toggleFavorite"
    >
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
    onCardClick: Function,
    clickCard: String
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
