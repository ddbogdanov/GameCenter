<template>
    <div style="height: 100%;">
        <NavBar/>

        <div class="crash-coin">
            <div class="multiplier">
                <CoinMultiplier :multiplier="multiplier"
                                :nextGameIn="nextGameIn"
                                :status="status"
                />
            </div>

            <div class="controls">
                <BetControls :nextGameIn="nextGameIn"
                             :status="status"
                             :betPlaced="betPlaced"
                             @onBetPlaced="onBetPlaced"
                             @onCashout="onCashout"
                />
            </div>

            <div class="wagers">
                <p v-for="(crash, index) of crashHistory" :key="index" style="color: coral; margin: 2px;">Crash: {{ crash.crash }} Multiplier: {{ crash.shown }}</p>
            </div>

            <div class="chatgrid">
                <UserChat :roomID="state.room.roomID"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket, state } from '@/socket'
import CrashCoinStatus from '@/model/CrashCoinStatus'
import NavBar from '@/components/navbar/NavBar.vue';
import CoinMultiplier from '@/components/game/crashcoin/CoinMultiplier.vue';
import UserChat from '@/components/UserChat.vue';
import BetControls from '@/components/game/crashcoin/BetControls.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar,
        CoinMultiplier,
        UserChat,
        BetControls
    },
    data() {
        return {
            betPlaced: false,
            multiplier: "1.00",
            crashHistory: [] as Array<any>,
            nextGameIn: 0,
            status: CrashCoinStatus.PLAYING,
            state: state,
        }
    },
    created() {
        socket.on('gameStart', () => {
            this.status = CrashCoinStatus.PLAYING
        })
        socket.on('multiplierUpdate', (data) => {
            this.multiplier = data.multiplier
            
        })
        socket.on('gameEnd', (data) => {
            this.status = CrashCoinStatus.CRASHED
            this.betPlaced = false
            this.multiplier = data.multiplier
            this.crashHistory.push({ crash: data.multiplier, shown: this.multiplier })
            
        })
        socket.on('nextGameIn', (data) => {
            this.nextGameIn = data
        })
    },
    methods: {
        onBetPlaced() {
            this.betPlaced = true
        },
        onCashout() {
            console.log('cashed out')
            this.betPlaced = false
        },
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
        "multiplier controls wagers" 1fr
        "chatgrid chatgrid wagers" 1fr
        / 1fr 1fr 1fr;
        grid-gap: 10px;
    }

    .multiplier { 
        grid-area: multiplier; 
        
        background-color: #454545;
        border-radius: 5px;
    }
    .controls { 
        grid-area: controls;

        background-color: #454545;
        border-radius: 5px;
    }
    .wagers { 
        grid-area: wagers;

        background-color: #454545;
        border-radius: 5px;

        overflow-y: scroll;
    }
    .chatgrid { 
        grid-area: chatgrid;
        min-height: 0;

        background-color: #454545;
        border-radius: 5px;
    }
</style>