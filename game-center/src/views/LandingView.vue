<template>
  <NavBar/>
  <div class="landing">
    <el-scrollbar class="main-scroll">
      <GamesGrid/>
    </el-scrollbar>
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

    padding: 0px 10px 0px 10px;

    background-color: #ff7060;
  }
</style>
