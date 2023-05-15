<template>
  <router-view/>
  <p-toast/>
  <p-dynamic-dialog/>
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
@import "@/style/theme.css";
@import "primevue/resources/primevue.min.css";
@import 'primeicons/primeicons.css';
@import url('https://fonts.googleapis.com/css2?family=Dosis&family=Roboto:wght@300;400;700&display=swap');

html, body {
  all: unset;
}
html {
  font-size: 14px;
}
body {
  font-family: var(--font-family);
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