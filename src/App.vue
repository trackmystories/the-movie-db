<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
}

nav {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
}

@media (max-width: 600px) {
  nav a {
    display: block;
    margin: 0.5rem 0;
  }
}
</style>
