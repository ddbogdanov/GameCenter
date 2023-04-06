<template>
  <div class="home">
    <WelcomePage></WelcomePage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WelcomePage from '@/components/WelcomePage.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    WelcomePage,
  },
});
</script>

<style scoped lang="scss">
.home {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

