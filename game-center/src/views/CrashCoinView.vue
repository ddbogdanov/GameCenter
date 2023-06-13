<template>
    <div style="height: 100%;">
        <NavBar/>

        <div class="crash-coin">
            <div class="multiplier">
                <CoinMultiplier :multiplier="multiplier"/>
            </div>

            <div class="play">

            </div>

            <div class="wagers">

            </div>

            <div class="chatgrid">
                <UserChat :roomID="state.room.roomID"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { socket, state } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue';
import CoinMultiplier from '@/components/game/crashcoin/CoinMultiplier.vue';
import UserChat from '@/components/UserChat.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar,
        CoinMultiplier,
        UserChat
    },
    data() {
        return {
            multiplier: "1.00",
            crashHistory: [] as Array<any>,
            nextGameIn: 0,
            state: state,
        }
    },
    created() {
        socket.on('multiplierUpdate', (data) => {
            this.multiplier = data.multiplier
            
        })
        socket.on('gameEnd', (data) => {
            this.crashHistory.push(data)
            
        })
        socket.on('nextGameIn', (data) => {
            this.nextGameIn = data
        })
    },
    methods: {
      
    }
})
</script>

<style scoped lang="scss">
    .crash-coin {
        width: 100%;
        height: calc(100% - 60px);

        padding: 10px 10px 10px 10px;

        background-color: #363636;

        display: grid;
        grid:
        "multiplier play wagers" 1fr
        "chatgrid chatgrid wagers" 1fr
        / 1fr 1fr 1fr;
        grid-gap: 10px;
    }

    .multiplier { 
        grid-area: multiplier; 
        
        background-color: #454545;
        border-radius: 5px;
    }
    .play { 
        grid-area: play;

        background-color: #454545;
        border-radius: 5px;
    }
    .wagers { 
        grid-area: wagers;

        background-color: #454545;
        border-radius: 5px;
    }
    .chatgrid { 
        grid-area: chatgrid;
        min-height: 0;

        background-color: #454545;
        border-radius: 5px;
    }
</style>