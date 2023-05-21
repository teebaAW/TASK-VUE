<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-center">
          <RouterLink class="nav-text" to="/">Home</RouterLink>
          <RouterLink class="nav-text" to="/quotation-list">Quote</RouterLink>
        </div>
      </div>
    </nav>
  </div>
  <RouterView />
</template>

<style>
.navbar {
  background-color: rgb(92, 171, 231);
  color: white;
  padding: 10px;
}

.navbar-center {
  display: flex;
  justify-content: center;
  justify-items: center;
  gap: 5px;
}

.navbar-link {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
.nav-text {
  color: aliceblue;
  text-decoration: none;
  font-size: large;
}
.nav-text:hover {
  color: red;
}
</style>
