<template>
  <div>
    <input
      class="input"
      v-model="searchQuery"
      @input="applySearch"
      placeholder="Search movies..."
    />
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

<style scoped>
.input {
  widht: 500px;
  height: 50px;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
