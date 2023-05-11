<template>
  <NavBar/>
  <div class="landing">
    <p-scroll-panel class="main-scroll">
      <GamesGrid/>
    </p-scroll-panel>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GamesGrid from '@/components/GamesGrid.vue'
import NavBar from '@/components/navbar/NavBar.vue';

export default defineComponent({
  name: 'LandingView',
  components: {
    GamesGrid,
    NavBar
  },
  methods: {

  }
});
</script>
<script lang="ts" setup>

</script>

<style scoped lang="scss">
  .landing {
    height: calc(100% - 60px);

    display: flex;
    justify-content: center;

    background-color: #f77f71;
  }
  .main-scroll {
    width: 60%;

    background-color: #ff7060;
  }

  ::v-deep(.p-scrollpanel.main-scroll .p-scrollpanel-bar) {
    background-color: #96b8bd;
    opacity: 0.8;
    transition: background-color 0.3s, opacity 0.3s;
  }
  ::v-deep(.p-scrollpanel.main-scroll .p-scrollpanel-bar:hover) {
    background-color: #7babb2;
    opacity: 1;
  }
</style>
