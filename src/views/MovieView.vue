<template>
  <div id="movie-view">
    <!-- Display movie details here -->
    <h2>{{ selectedMovie.title }}</h2>
    <p>Release Date: {{ selectedMovie.releaseDate }}</p>
    <p>Vote Average: {{ selectedMovie.voteAverage }}</p>

    <!-- Add additional movie details as needed -->

    <button @click="goBack">Back to Movie List</button>
  </div>
</template>

<script>
export default {
  name: 'MovieView',
  props: {
    selectedMovie: Object
  },
  methods: {
    goBack() {
      // Emit an event to notify the parent component to hide the MovieView
      this.$emit('close-movie-view')
    }
  }
}
</script>

<style scoped>
#movie-view {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
