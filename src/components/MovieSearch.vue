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
  width: 350px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: solid #333 0.5px;
  padding-left: 15px;
}
</style>
