<template>
    <NavBar/>
    <div class="lobby">
        <div class="table">
            <LobbyTable/>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LobbyView',
  components: {
    NavBar,
    LobbyTable,
  }
});
</script>
<script setup lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'
import LobbyTable from '@/components/LobbyTable.vue'
</script>

<style scoped lang="scss">
    .lobby {
        height: calc(100% - 60px);

        display: flex;
        justify-content: center;
    }   
    .table {
        width: 60%;
    }
</style>