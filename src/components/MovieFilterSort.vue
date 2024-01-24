<template>
  <div>
    <!-- Genre Filter -->
    <select v-model="selectedGenre" @change="applyFilterSort">
      <option value="">Select Genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>

    <!-- Sorting Options -->
    <select v-model="selectedSort" @change="applyFilterSort">
      <option value="">Select Sort</option>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <!-- Add more sorting options as needed -->
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGenre: '',
      selectedSort: '',
      genres: [] // This will hold the list of genres
    }
  },
  created() {
    this.fetchGenres() // Fetch genres when the component is created
  },
  methods: {
    fetchGenres() {
      // API call to fetch genres. This is just a placeholder.
      // Replace with an actual API call to fetch genres.
      this.genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' }
        // Add more genres as needed
      ]
    },
    applyFilterSort() {
      this.$emit('filter-sort-changed', {
        genre: this.selectedGenre,
        sort: this.selectedSort
      })
    }
  }
}
</script>
