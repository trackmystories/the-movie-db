<template>
  <div id="fav-container">
    <movie-search @search-applied="handleSearch"></movie-search>
    <movie-filter-sort @filter-sort-changed="handleFilterSortChange"></movie-filter-sort>
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
import MovieFilterSort from '../components/MovieFilterSort.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'FavView',
  components: {
    MovieSearch,
    MovieCard,
    MovieFilterSort
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
      console.log('favorites', favorites)
      this.originalFavorites = Object.values(favorites)
      this.favorites = [...this.originalFavorites]
    },

    handleSearch(searchQuery) {
      this.searchQuery = searchQuery.toLowerCase()
      this.applyFilterAndSort()
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
    },

    applyFilterAndSort(filterSortData = {}) {
      let filtered = [...this.originalFavorites]

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter((favorite) =>
          favorite.movie.title.toLowerCase().includes(this.searchQuery)
        )
      }

      // Filter by genre if specified
      if (filterSortData.genre) {
        filtered = filtered.filter(
          (favorite) =>
            favorite.movie.genreIds &&
            favorite.movie.genreIds.includes(parseInt(filterSortData.genre))
        )
      }

      // Sort by the specified order
      switch (filterSortData.sort) {
        case 'title':
          filtered.sort((a, b) => a.movie.title.localeCompare(b.movie.title))
          break
        case 'rating':
          filtered.sort((a, b) => b.movie.vote_average - a.movie.vote_average)
          break
        case 'popularity.asc':
          filtered.sort((a, b) => a.movie.popularity - b.movie.popularity)
          break
        case 'popularity.desc':
          filtered.sort((a, b) => b.movie.popularity - a.movie.popularity)
          break
      }

      this.favorites = filtered
    },

    handleFilterSortChange(filterSortData) {
      this.applyFilterAndSort(filterSortData)
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
