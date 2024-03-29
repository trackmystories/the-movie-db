<template>
  <div id="fav-container">
    <movie-search @search-applied="handleSearch"></movie-search>
    <movie-filter-sort @filter-sort-changed="handleFilterSortChange"></movie-filter-sort>
    <h1>Favorite Movies</h1>
    <div v-if="favorites.length">
      <div class="favorite-item" v-for="favorite in favorites" :key="favorite.movie.id">
        <movie-card
          :movie="favorite.movie"
          :is-favorite="isFavorite(favorite.movie)"
          @toggle-favorite="toggleFavorite"
          :release-date="favorite.movie.release_date"
          :rating="favorite.movie.vote_average"
          :show-summary="false"
          :showCardClickButton="false"
          :note="favorite.note"
        />
      </div>
    </div>
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
      console.log('Fetched favorites from localStorage:', favorites)
      this.originalFavorites = Object.values(favorites)
      this.favorites = [...this.originalFavorites]
      console.log('Processed favorites:', this.favorites)
    },

    handleSearch(searchQuery) {
      this.searchQuery = searchQuery.toLowerCase()
      console.log('Search query:', this.searchQuery)
      this.applyFilterAndSort()
      console.log('Favorites after applying search:', this.favorites)
    },

    toggleFavorite(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      console.log('Toggling favorite for movie:', movie)
      if (favorites[movie.id]) {
        delete favorites[movie.id]
      } else {
        let note = prompt('Add a note for this movie:')
        favorites[movie.id] = { movie, note }
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.fetchFavorites()
      console.log('Updated favorites:', favorites)
    },

    isFavorite(movie) {
      return this.favorites.some((fav) => fav.movie.id === movie.id)
    },

    applyFilterAndSort(filterSortData = {}) {
      let filtered = [...this.originalFavorites]
      console.log('Applying filter and sort:', filterSortData)

      if (this.searchQuery) {
        filtered = filtered.filter((favorite) =>
          favorite.movie.title.toLowerCase().includes(this.searchQuery)
        )
      }

      if (filterSortData.genre) {
        filtered = filtered.filter(
          (favorite) =>
            favorite.movie.genreIds &&
            favorite.movie.genreIds.includes(parseInt(filterSortData.genre))
        )
      }

      switch (filterSortData.sort) {
        case 'popularity.asc':
          filtered.sort((a, b) => a.movie.popularity - b.movie.popularity)
          break
        case 'popularity.desc':
          filtered.sort((a, b) => b.movie.popularity - a.movie.popularity)
          break
      }

      this.favorites = filtered
      console.log('Favorites after filter and sort:', this.favorites)
    },

    handleFilterSortChange(filterSortData) {
      console.log('Filter/Sort changed:', filterSortData)
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

#fav-container .favorite-item {
  width: 100%;
}
</style>
