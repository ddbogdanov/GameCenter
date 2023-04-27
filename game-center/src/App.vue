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
/* @forward 'element-plus/theme-chalk/src/dark/var.scss' with (
//   // $colors: (
//   //   (
//   //   'white': #ffffff,
//   //   'black': #000000,
//   //   'primary': (
//   //     'base': #409eff,
//   //   ),
//   //   'success': (
//   //     'base': #67c23a,
//   //   ),
//   //   'warning': (
//   //     'base': #e6a23c,
//   //   ),
//   //   'danger': (
//   //     'base': #89ffc0,
//   //   ),
//   //   'error': (
//   //     'base': #89ffc0,
//   //   ),
//   //   'info': (
//   //     'base': #909399,
//   //   ),
//   // )
//   // ),
//   $bg-color: (
//     'page': #0a0a0a,
//     //'': #626aef,
//     'overlay': #1d1e1f,
//   )
  );
*/
@use "element-plus/theme-chalk/src/index.scss" as *;
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
@import url('https://fonts.googleapis.com/css2?family=Dosis&family=Roboto:wght@300;400;700&display=swap');

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