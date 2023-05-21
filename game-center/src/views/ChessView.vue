<template>
    <div style="height: 100%;">
        <NavBar/>
        <div class="chess">
            <div class="board-container">
                <ChessBoard/>

                <div class="waiting-overlay">
                    <div class="overlay-content">
                        <div class="waiting-text">
                            <span v-for="(letter, index) in waitingText" 
                                :key="index"
                                :style="`--i:${index}`" 
                                :class="letter == ' ' ? 'space' : 'letter'"
                            >
                                {{ letter }}
                            </span>
                        </div>
                        <p-button severity="success"
                                label="Start"
                                @click="onStart"
                                style="width: 100%;"
                                v-if="readyToStartAndIsFirstTurn"
                        />
                    </div>
                </div>
            </div>
            <div class="sidebar-container">
                <GameSidebar :ready-to-start="readyToStart"/>
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
                return 'Waiting for First Turn'
            }
            return 'Waiting for Players'
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onStart() {
            console.log('starting')
        }
    }
});
</script>

<style lang="scss">
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
        width: 75vw;
        height: 100%;

        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-container {
        height: 100%;
        width: 25vw;
    }

    .waiting-overlay {
        position: absolute;
        z-index: 1001;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;;

        backdrop-filter: blur(10px);

        display: flex;
        justify-content: center;
        align-items: center;

        .overlay-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }

    .waiting-text {
        position: relative;

        font-family: dosis;
        font-size: 4rem;
        font-weight: 600;
        color: var(--primary-color);
        -webkit-text-stroke: 1px black;

        .space {
            width: 15px;
        }
        span {
            position: relative;
            display: inline-block;
            animation: flip 4s infinite;
            animation-delay: calc(100ms * var(--i))
        }
    }
    @keyframes flip {
        0%,70% {
            transform: rotateY(360deg) 
        }
    }
</style>