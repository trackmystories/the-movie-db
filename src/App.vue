<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</RouterLink>
      <RouterLink to="/favorites" class="nav-link" :class="{ active: $route.path === '/favorites' }"
        >Favorites</RouterLink
      >
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
  background-color: #e8edec;
}

.nav-link {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: green;
}

.active {
  color: #d15517;
}

@media (max-width: 600px) {
  nav a {
    display: block;
    margin: 0.5rem 0;
  }
}
</style>
