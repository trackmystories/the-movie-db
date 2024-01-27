<template>
  <div id="movie-view" v-if="movie">
    <div class="movie-container">
      <h1 class="text">Movie Details: {{ movie.title }}</h1>
      <img
        class="img"
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        alt="Movie Poster"
      />
      <p>Release Date: {{ movie.release_date }}</p>
      <p>Rating: {{ movie.vote_average }}</p>
      <p>
        Genres: <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</span>
      </p>
      <p>Original Language: {{ movie.original_language }}</p>
      <p>Popularity: {{ movie.popularity }}</p>
      <p>Overview: {{ movie.overview }}</p>
    </div>
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
  justify-content: center;
  margin-top: 80px;
}

.movie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
}

#movie-view .img {
  width: auto;
  height: 500px;
  object-fit: contain;
}

.text {
  font-size: 30px;
}

@media (max-width: 480px) {
  #movie-view {
    margin: auto;
  }
  .movie-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
}
</style>
