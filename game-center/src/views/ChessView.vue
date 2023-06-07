<template>
    <div style="height: 100%;">
        <NavBar/>
        <div class="chess">
            <div class="board-container">
                <ChessBoard :has-started="hasStarted"
                            @move-made="onMoveMade"
                            @move-recieved="onMoveRecieved"
                            @checkmate="onCheckmate"
                            @stalemate="onStalemate"
                />
                <WaitingOverlay v-if="!hasStarted"
                                :waiting-text="waitingText"
                                :show-start-button="readyToStartAndIsFirstTurn"
                                @start="onStart"
                />
            </div>
            <div class="sidebar-container">
                <GameSidebar :ready-to-start="readyToStart"
                             :moveHistory="moveHistory"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import { MoveEvent, PieceColor } from 'vue3-chessboard'
import NavBar from '@/components/navbar/NavBar.vue'
import ChessBoard from '@/components/ChessBoard.vue'
import GameSidebar from '@/components/GameSidebar.vue'
import Room from '@/model/Room'
import Status from '@/model/Status'
import WaitingOverlay from '@/components/WaitingOverlay.vue'

export default defineComponent({
    name: 'ChessView',
    components: {
        NavBar,
        ChessBoard,
        GameSidebar,
        WaitingOverlay
    },
    computed: {
        readyToStart(): boolean {
            return state.room.game.minimumUsers <= state.room.users.length
        },
        readyToStartAndIsFirstTurn(): boolean {
            return this.readyToStart && state.room.currentTurn == state.session.user.username
        },
        waitingText(): string {
            if(this.readyToStartAndIsFirstTurn) {
                return 'Ready to Start'
            }
            else if(this.readyToStart) {
                return 'Waiting for Host'
            }
            return 'Waiting for Players'
        }
    },
    data() {
        return {
            hasStarted: false,
            moveHistory: [] as Array<{user: string | undefined, move: string}>
        }
    },
    mounted() {
        socket.on('startedChessGame', (res: Room) => {
            state.room = res
            this.hasStarted = true
        })
    },
    methods: {
        onStart() {
            socket.emit('startChessGame', state.room.roomID, (res: Room) => {
                state.room = res
                this.hasStarted = true
            })
        },
        onMoveMade(move: MoveEvent) {
            this.moveHistory.push({ user: state.session.user.username, move: move.lan })
        },
        onMoveRecieved(move: MoveEvent) {
            this.moveHistory.push({ 
                user: state.room.users.find((user) => user.username !== state.session.user.username)?.username, 
                move: move.lan 
            })
        },
        onCheckmate(color: PieceColor) {
            socket.emit('checkmate', { user: state.session.user, 
                                       sessionID: state.session.sessionID, 
                                       color: color, 
                                       roomID: state.room.roomID 
            }, (res: any) => {
                this.$toast.add({
                    severity: 'info',
                    summary: 'Checkmate',
                    detail: res.message,
                    life: 3000
                })
                state.room.status = Status.FINISHED
                state.session = res.session
            })
        },
        onStalemate() {
            this.$toast.add({ 
                    severity: 'info',
                    summary: 'Stalemate', detail: `No more legal moves`,
                    life: 3000 
            })
        }
    }
});
</script>

<style scoped lang="scss">
    .chess {
        width: 100%;
        height: calc(100% - 60px);

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        background-color: #f57566;
    }
    .board-container {
        flex: 1;
        height: 100%;

        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-container {
        height: 100%;
        width: 30vw;
    }
</style>