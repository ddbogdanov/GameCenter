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
import GamesGrid from '@/components/home/GamesGrid.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import HomeHeader from '@/components/home/HomeHeader.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    GamesGrid,
    NavBar,
    HomeHeader
  },
  methods: {

  },
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

    background-color: #454545;
  }
  .home-content {
    width: 60%;
    height: 100%;

    background-color: var(--primary-color);
    box-shadow: 0px 3px 8px #303030cb;
    box-shadow: 12px 0 15px -4px #303030cb, -12px 0 8px -4px #303030cb;

    @media only screen and (max-width: 1000px) {
      width: 100%;
    }
  }
</style>
