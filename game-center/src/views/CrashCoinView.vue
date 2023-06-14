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
                             :lastBet="lastBet"
                             :lastProfit="lastProfit"
                             @onPlaceBet="onPlaceBet"
                             @onCashout="onCashout"
                />
            </div>

            <div class="bets">
                <BetsTable :bets="bets"/>
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
import CrashCoinBet from '@/model/CrashCoinBet';
import BetsTable from '@/components/game/crashcoin/BetsTable.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar,
        CoinMultiplier,
        UserChat,
        BetControls,
        BetsTable
    },
    data() {
        return {
            betPlaced: false,
            multiplier: "1.00",
            lastBet: "0.00",
            lastProfit: "0.0000",
            crashHistory: [] as Array<any>,
            nextGameIn: 0,
            status: CrashCoinStatus.PLAYING,
            state: state,
            bets: [] as Array<CrashCoinBet>
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
            this.bets = []
            this.betPlaced = false
            this.multiplier = data.multiplier
            this.crashHistory.push({ crash: data.multiplier, shown: this.multiplier })
            
        })
        socket.on('nextGameIn', (data) => {
            this.nextGameIn = data
        })
        socket.on('newBet', (data) => {
            this.bets.push(data)
        })
        socket.on('recieveCashout', (data) => {
            let betIndex = this.bets.findIndex((bet) => bet.user.userID == data.user.userID)

            this.bets[betIndex] = data
        })
        socket.on('recieveLostBet', (data) => {
            let betIndex = this.bets.findIndex((bet) => bet.user.userID == data.user.userID)

            this.bets[betIndex] = data
        })
        socket.on('betLost', (data) => {
            state.session.user.coins = data.coins
            this.lastProfit = data.profit
        })
    },
    methods: {
        onPlaceBet(bet: any) {
            this.betPlaced = true

            bet.userID = state.session.user.userID
            bet.roomID = state.room.roomID
            bet.sessionID = state.session.sessionID
            socket.emit('placeBet', bet, (data: any) => {
                if(!data.status) {
                    this.betPlaced = false
                    this.$toast.add({ 
                        severity: 'error',
                        summary: 'Error', detail: data.message,
                        life: 2000 
                    })
                }
                else {
                    this.lastBet = data.lastBet
                    state.session.user.coins = data.coins
                }
            })
        },
        onCashout() {
            this.betPlaced = false

            socket.emit('cashout', { userID: state.session.user.userID, roomID: state.room.roomID, sessionID: state.session.sessionID }, 
            (data: any) => {
                if(!data.status) {
                    this.$toast.add({ 
                        severity: 'error',
                        summary: 'Error', detail: data.message,
                        life: 2000 
                    })
                }
                else {
                    this.lastProfit = data.profit
                    state.session.user.coins = data.coins
                }
            })
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
        "multiplier controls bets" 1fr
        "chatgrid chatgrid bets" 1fr
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
    .bets { 
        grid-area: bets;

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