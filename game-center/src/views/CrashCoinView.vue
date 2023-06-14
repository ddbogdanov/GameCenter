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

            <div class="lower">
                <div class="panel-view">

                    <div class="panel-controls">
                        <button class="control chat" :class="{ active: chatOpen}" @click="openChat">
                            <p class="label">Chat</p>
                        </button>
                        <button class="control leaderboard" :class="{ active: leaderboardOpen}" @click="openLeaderboard">
                            <p class="label">Leaderboard</p>
                        </button>
                        <button class="control bets" :class="{ active: betsOpen}" @click="openBets">
                            <p class="label">Bets</p>
                        </button>
                    </div>

                    <div class="panel" v-show="chatOpen">
                        <UserChat :roomID="state.room.roomID"/>
                    </div>
                    <div class="panel" v-show="leaderboardOpen">
                        <LeaderboardTable :leaderboard="leaderboard"/>
                    </div>
                    <div class="panel" v-show="betsOpen">
                        <BetsTable :bets="bets"/>
                    </div>

                </div>
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
import LeaderboardTable from '@/components/game/crashcoin/LeaderboardTable.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar,
        CoinMultiplier,
        UserChat,
        BetControls,
        BetsTable,
        LeaderboardTable
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
            bets: [] as Array<CrashCoinBet>,
            leaderboard: [] as Array<CrashCoinBet>,

            chatOpen: true,
            leaderboardOpen: false,
            betsOpen: false
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
        socket.on('recieveLeaderboard', (data) => {
            this.leaderboard = data
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

        openChat() {
            this.chatOpen = true
            this.leaderboardOpen = false,
            this.betsOpen = false
        },
        openLeaderboard() {
            this.chatOpen = false
            this.leaderboardOpen = true,
            this.betsOpen = false
        },
        openBets() {
            this.chatOpen = false,
            this.leaderboardOpen = false,
            this.betsOpen = true
        }
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
        "lower lower bets" 1fr
        / 1fr 1fr 1fr;
        grid-gap: 10px;

        @media only screen and (max-width: 900px) {
            grid:
            "multiplier controls" 1fr
            "lower lower" 1fr
            / 1fr 1fr;
        }
        @media only screen and (max-width: 500px) {
            grid:
            "multiplier"
            "controls"
            "lower"
            / 1fr;
        }
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

        @media only screen and (max-width: 900px) {
            display: none;
        }
    }
    .lower { 
        grid-area: lower;
        min-height: 0;

        background-color: #454545;
        border-radius: 5px;
    }


    .panel-view {
        height: 100%;
        padding: 5px 5px 5px 5px;
        display: flex;
        .panel-controls {
            width: 40px;
            display: grid;

            padding: 2px 0px 2px 0px;

            grid-auto-rows: 1fr;
            grid-gap: 5px;

            border-radius: 5px 0px 0px 5px;
            border-right: 1px solid #363636;
            
            overflow: hidden;

            .control {
                width: 40px;
                height: 100%;

                margin-left: 5px;

                display: flex;
                justify-content: center;
                align-items: center;

                transition: all 500ms;

                background-color: transparent;
                border: 1px solid var(--primary-500);
                border-radius: 5px 0px 0px 5px;

                .label {
                    color: white;
                    font-weight: 600;
      
                    writing-mode: vertical-rl;
                    transform: rotate(-180deg);
                }

                &.bets {
                    @media only screen and (min-width: 900px) {
                        display: none;
                    }
                }

                &.active {
                    background-color: var(--primary-500);
                    margin-left: 0px;
                }
                &:hover {
                    margin-left: 0px;
                }
            }
            button { 
                all: unset;
                cursor: pointer;
            }
        }
        .panel {
            padding-left: 5px;
            flex: 1;
        }
    }
</style>