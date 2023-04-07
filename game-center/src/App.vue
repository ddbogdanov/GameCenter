<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
  <DebugFooter class="footer"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DebugFooter from '@/components/DebugFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    DebugFooter,
  },
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
.footer {
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
</style>
