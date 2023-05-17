<template>
    <div style="height: 100%;">
        <NavBar/>
        <div class="chess">
            <div class="board-container">
                <ChessBoard/>
            </div>
            <div class="sidebar-container">
                <GameSidebar/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue'
import ChessBoard from '@/components/ChessBoard.vue'
import GameSidebar from '@/components/GameSidebar.vue'


export default defineComponent({
    name: 'ChessView',
    components: {
        NavBar,
        ChessBoard,
        GameSidebar
    },
});
</script>

<style lang="scss">
    .chess {
        width: 100%;
        height: calc(100% - 60px);

        display: flex;
        flex-direction: row;

    }
    .board-container {
        width: 75vw;
    }
    .sidebar-container {
        height: 100%;
        width: 25vw;
    }
</style>