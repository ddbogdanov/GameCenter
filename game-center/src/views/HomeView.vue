<template>
  <div style="height: 100%;">
    <NavBar/>
    <div class="home">
      <div class="home-content">
        <HomeHeader/>
        <GamesGrid/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GamesGrid from '@/components/GamesGrid.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import HomeHeader from '@/components/HomeHeader.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    GamesGrid,
    NavBar,
    HomeHeader
  },
  methods: {

  }
});
</script>

<style scoped lang="scss">
  .home {
    height: calc(100% - 60px);
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    background-color: #f77f71;
  }
  .home-content {
    width: 60%;
    height: 100%;

    background-color: #ff7060;

    @media only screen and (max-width: 1000px) {
      width: 100%;
    }
  }
</style>
