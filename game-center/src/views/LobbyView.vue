<template>
    <NavBar/>
    <div class="lobby">
        <div class="table">
            <LobbyTable/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navbar/NavBar.vue'
import LobbyTable from '@/components/LobbyTable.vue'
export default defineComponent({
  name: 'LobbyView',
  components: {
    NavBar,
    LobbyTable,
  }
});
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
    .lobby {
        height: calc(100% - 60px);
        width: 100%;

        display: flex;
        justify-content: center;
        
    }   
    .table {
        padding-top: 10px;

        width: 60%;

        @media only screen and (max-width: 1100px) {
            width: 80%
        }
        @media only screen and (max-width: 800px) {
            width: 100%
        }
    }
</style>