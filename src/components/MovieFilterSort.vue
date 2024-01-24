<template>
  <div>
    <select v-model="selectedGenre" @change="applyFilterSort">
      <option value="">Select Genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>

    <select v-model="selectedSort" @change="applyFilterSort">
      <option value="">Select Sort</option>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGenre: '',
      selectedSort: '',
      genres: []
    }
  },
  created() {
    this.fetchGenres()
  },
  methods: {
    fetchGenres() {
      this.genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' }
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
