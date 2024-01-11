<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark" :style="{ background: gradientBackground }">
      <router-link to="/" class="navbar-brand">CRUD Vue</router-link>
      <div class="navbar-nav mr-auto">

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link">Add</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container.fluid mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      gradientBackground: "linear-gradient(to right, #232526, #3c7a60)"
    }
  }
};
</script>