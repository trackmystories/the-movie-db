<template>
  <div>
    <input v-model="searchQuery" @input="applySearch" placeholder="Search movies..." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    applySearch() {
      this.$emit('search-applied', this.searchQuery)
    }
  }
}
</script>
