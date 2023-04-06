<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dosis&family=Roboto:wght@300;400;700&display=swap');
@import url('element-plus/dist/index.css');
@import url('element-plus/theme-chalk/dark/css-vars.css');

html, body {
  all: unset;
}

#app {
  height: 100vh
}
</style>
