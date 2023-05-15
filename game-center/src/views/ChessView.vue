<template>
    <NavBar/>

    <div class="chess">
        <ChessBoard/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue'
import ChessBoard from '@/components/ChessBoard.vue'


export default defineComponent({
    name: 'ChessView',
    components: {
        NavBar,
        ChessBoard
    },
});
</script>

<style lang="scss">

</style>