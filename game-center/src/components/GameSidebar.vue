<template>
    <div class="game-sidebar">
        <div class="sidebar-start">
            <div class="header">
                <h1>{{ state.room.game.name }}</h1>
            </div>

            <p-divider/>

            <div class="player-information-container">
                <div class="player-information" 
                     v-for="user in state.room.users" 
                     :key="user.userID"
                >
                    <p-avatar :image="this.$avatarUrl  + user.avatarID + '.svg'"
                              shape="circle"
                              size="large"
                    />
                    <p>{{ user.username }}</p>
                </div>
            </div>

        </div>

        <div class="sidebar-end">

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import { Game } from '@/model/Game.ts'

export default defineComponent({
    name: 'ChessView',
    components: {

    },
    data() {
        return {
            state: state
        }
    },
    props: {

    }
});
</script>

<style lang="scss">
    .game-sidebar {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 10px 10px 10px 10px;

        color: white;
        background-color: #363636;
    }

    .sidebar-start {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .header {
            font-family: dosis;
        }
    }

    .player-information-container {

        display: inline-flex;
        align-items: center;
        justify-content: center;

        .player-information {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
</style>