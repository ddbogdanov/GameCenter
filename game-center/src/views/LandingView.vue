<template>
  <NavBar/>
  <div class="landing">
    <div class="landing-content">
      <LandingHeader/>
      <GamesGrid/>
    </div>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GamesGrid from '@/components/GamesGrid.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import LandingHeader from '@/components/LandingHeader.vue';

export default defineComponent({
  name: 'LandingView',
  components: {
    GamesGrid,
    NavBar,
    LandingHeader
  },
  methods: {

  }
});
</script>

<style scoped lang="scss">
  .landing {
    height: calc(100% - 60px);
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    background-color: #f77f71;
  }
  .landing-content {
    width: 60%;
    height: 100%;

    background-color: #ff7060;
  }
</style>
