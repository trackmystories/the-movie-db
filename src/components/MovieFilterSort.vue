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
        {
          id: 28,
          name: 'Action'
        },
        {
          id: 12,
          name: 'Adventure'
        },
        {
          id: 16,
          name: 'Animation'
        },
        {
          id: 35,
          name: 'Comedy'
        },
        {
          id: 80,
          name: 'Crime'
        },
        {
          id: 99,
          name: 'Documentary'
        },
        {
          id: 18,
          name: 'Drama'
        },
        {
          id: 10751,
          name: 'Family'
        },
        {
          id: 14,
          name: 'Fantasy'
        },
        {
          id: 36,
          name: 'History'
        },
        {
          id: 27,
          name: 'Horror'
        },
        {
          id: 10402,
          name: 'Music'
        },
        {
          id: 9648,
          name: 'Mystery'
        },
        {
          id: 10749,
          name: 'Romance'
        },
        {
          id: 878,
          name: 'Science Fiction'
        },
        {
          id: 10770,
          name: 'TV Movie'
        },
        {
          id: 53,
          name: 'Thriller'
        },
        {
          id: 10752,
          name: 'War'
        },
        {
          id: 37,
          name: 'Western'
        }
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
