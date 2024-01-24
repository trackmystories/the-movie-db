<template>
  <div>
    <select v-model="selectedGenre" @change="applyFilterSort" class="custom-select">
      <option value="">Select Genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>

    <select v-model="selectedSort" @change="applyFilterSort" class="custom-select">
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

<style>
.custom-select {
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
}

.custom-select::after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.custom-select option {
  background-color: white;
  color: #333;
  font-size: 16px;
}
</style>
