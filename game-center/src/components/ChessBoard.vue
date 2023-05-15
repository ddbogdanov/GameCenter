<template>
    <TheChessboard :board-config="boardConfig"
                   @board-created="(api) => (boardAPI = api)"
                   @move="handleMove"
    />
    <p-button label="Threats"
              severity="primary"
              @click="boardAPI.toggleMoves()"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import type { BoardApi, BoardConfig, MoveEvent } from 'vue3-chessboard';

const boardAPI = ref<BoardApi>();
const boardConfig: BoardConfig = {
    coordinates: false,
    autoCastle: false,
    movable: {
        free: false
    },
};

function handleMove(move: MoveEvent) {
    console.log(move)
}

</script>

<style lang="scss">

</style>