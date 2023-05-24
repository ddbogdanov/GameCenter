<template>
    <div class="chess-board">
        <div v-if="!hasStarted">
            <TheChessboard/>
        </div>
        <div v-else>
            <TheChessboard :board-config="boardConfig"
                       :player-color="playerColor"
                       @board-created="(api) => (boardAPI = api)"
                       @move="handleMove"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ComputedRef, ref } from 'vue'
import { TheChessboard } from 'vue3-chessboard'
import { socket, state } from '@/socket'
import 'vue3-chessboard/style.css';
import type { BoardApi, BoardConfig, MoveEvent } from 'vue3-chessboard'
import { computed } from '@vue/reactivity';

const props = defineProps({
    hasStarted: {
        type: Boolean,
        default: false
    }
})

const playerColor: ComputedRef<'white' | 'black'> = computed((): 'white' | 'black' => {
    if((state.room.game as any).black.username === state.session.user.username) {
        boardAPI.value?.toggleOrientation()
        return 'black'
    }
    return 'white'
})

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
    socket.emit('chessMove', { move: move, roomID: state.room.roomID })
}
socket.on('recieveChessMove', (move: MoveEvent) => {
    boardAPI.value?.move(move.san)
    console.log(move)
})

</script>

<style scoped lang="scss">
    .chess-board {
        position: relative;
    }
</style>