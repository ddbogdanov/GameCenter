<template>
    <div class="chess-board">
        <TheChessboard :board-config="boardConfig"
                       @board-created="(api) => (boardAPI = api)"
                       @move="handleMove"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TheChessboard } from 'vue3-chessboard'
import { socket, state } from '@/socket'
import 'vue3-chessboard/style.css';
import type { BoardApi, BoardConfig, MoveEvent } from 'vue3-chessboard'

const boardAPI = ref<BoardApi>();
const boardConfig: BoardConfig = {
    coordinates: true,
    autoCastle: true,
    viewOnly: false,
    movable: {
        free: false
    },
}

function handleMove(move: MoveEvent) {
    console.log(move)
}

</script>

<style scoped lang="scss">
    .chess-board {
        position: relative;
    }
    .disabled {
        pointer-events: none;
        filter: blur(5px);
    }
</style>