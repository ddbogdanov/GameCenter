<template>
    <div class="chess-board">
        <div v-if="!hasStarted">
            <TheChessboard/>
        </div>
        <div v-else>
            <TheChessboard :board-config="boardConfig"
                           :player-color="playerColor" 
                           @board-created="(api) => (boardAPI = api)"
                           @move="onMove"
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
const emit = defineEmits<{
    (e: 'moveMade', move: MoveEvent): void,
    (e: 'moveRecieved', move: MoveEvent): void
}>()

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
    movable: {
        free: false
    },
}

let isRecievingMove = false
function onMove(move: MoveEvent) {
    if(isRecievingMove) { 
        return 
    }
    emit('moveMade', move)
    socket.emit('chessMove', { move: move, roomID: state.room.roomID })
}
socket.on('recieveChessMove', (move: MoveEvent) => {
    isRecievingMove = true
    emit('moveRecieved', move)
    boardAPI.value?.move(move.san)
    isRecievingMove = false
})

</script>

<style scoped lang="scss">
    .chess-board {
        position: relative;
    }
</style>