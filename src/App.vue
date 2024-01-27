<template>
  <header>
    <nav>
      <div id="nav-container">
        <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }"
          >Home</RouterLink
        >
        <RouterLink
          to="/favorites"
          class="nav-link"
          :class="{ active: $route.path === '/favorites' }"
          >Favorites</RouterLink
        >
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

nav {
  display: flex;
  justify-content: center;
  width: 100%;
}

#nav-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.nav-link:hover,
.active {
  color: #4caf50;
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
}
</style>
