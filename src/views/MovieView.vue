<template>
  <div id="movie-view" v-if="movie">
    <h1>Movie Details</h1>
    <h1>{{ movie.title }}</h1>
    <img :src="movie.poster_path" alt="Movie Poster" />
    <p>Release Date: {{ movie.release_date }}</p>
    <p>Rating: {{ movie.vote_average }}</p>
    <p>Overview: {{ movie.overview }}</p>
  </div>
  <div v-else>Loading movie details...</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: null
    }
  },
  created() {
    this.fetchMovieDetails()
  },
  methods: {
    fetchMovieDetails() {
      const apiKey = '9378bcf55958be3e4ed2a54ec277b1c7'
      fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${apiKey}&language=en-US`)
        .then((res) => res.json())
        .then((data) => {
          this.movie = data
        })
        .catch((err) => console.error('error:', err))
    }
  }
}
</script>

<style scoped>
#movie-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify: center;
  padding: 150px;
}
</style>
