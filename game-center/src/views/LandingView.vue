<template>
  <div class="landing">
    <GamesGrid/>
    <el-button type="danger" @click="disconnect">Disconnect</el-button>
  </div>   
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from "@/socket";
import GamesGrid from '@/components/GamesGrid.vue'

export default defineComponent({
  name: 'LandingView',
  components: {
    GamesGrid
  },
  methods: {
    disconnect() {
      sessionStorage.removeItem("gameCenterSessionID")
      sessionStorage.removeItem("gameCenterSessionUsername")
      socket.disconnect()
      this.$router.push('/')
    }
  }
});
</script>
<script lang="ts" setup>

</script>

<style scoped lang="scss">
  .landing {
    height: 100%;

    background-color: #f77f71;
  }
</style>
