<template>
  <router-view/>
  <p-toast/>
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
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
</script>

<style lang="scss">
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    (
    'white': #ffffff,
    'black': #000000,
    'primary': (
      'base': #1facc5,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #6fcf9c,
    ),
    'error': (
      'base': #89ffc0,
    ),
    'info': (
      'base': #909399,
    ),
  )
  )
);
@use "element-plus/theme-chalk/src/index.scss" as *;
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
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