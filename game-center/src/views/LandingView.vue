<template>
  <div class="landing">
    <WelcomePage/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WelcomePage from '@/components/WelcomePage.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'LandingView',
  components: {
    WelcomePage,
  },
});
</script>

<style scoped lang="scss">
.landing {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

