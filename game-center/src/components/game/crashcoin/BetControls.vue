<template>
    <div class="bet-controls">
        <div class="header">
            <div class="start">
                <h3>Controls</h3>
            </div>
            <div class="end">
                <i class="pi pi-info-circle info"
                    v-tooltip.left.focus="'You can place your bet in between rounds. Try to cash out before the multiplier crashes! Setting the payout to 1.00x means you will have to cashout manually, anything other, and it will cashout automatically.'"
                    tabindex="2"
                    style="cursor: pointer;"
                />
            </div>
        </div>

        <div class="controls">
            <form @submit.prevent="onPlaceBet()" class="wager-form">

                <div class="form-content">
                    <span class="p-inputgroup">
                        <span class="p-inputgroup-addon">Bet</span>
                        <p-input-number v-model="wager"
                                        :min="0.01"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                        :step="0.01"
                                        suffix=" Coins"
                                        showButtons
                        />
                    </span>

                    <span class="p-inputgroup">
                        <span class="p-inputgroup-addon">Payout</span>
                        <p-input-number v-model="payout"
                                        :min="1"
                                        :max="100"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                        :step="0.01"
                                        suffix="x"
                                        showButtons
                        />
                    </span>
                </div>

                <div class="form-information">
                    <div class="balance">
                        <h1>Balance</h1>
                        <span class="coins">
                            <i id="coin-icon" class="pi pi-bitcoin"/>
                            <h1>{{ state.session.user.coins }}</h1>
                        </span>
                    </div>

                    <p-divider class="information-divider"/>

                    <div class="immediate-history">
                        <div class="last-bet">
                            <h1>Last Bet</h1>
                            <span class="coins">
                                <i id="coin-icon" class="pi pi-bitcoin"/>
                                <h1>{{ lastBet }}</h1>
                            </span>
                        </div>

                        <p-divider layout="vertical"/>

                        <div class="last-profit">
                            <h1>Last Profit</h1>
                            <span class="coins">
                                <i id="coin-icon" class="pi pi-bitcoin"/>
                                <h1>{{ lastProfit }}</h1>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="form-footer">
                    <p-button type="submit"
                              severity="primary"
                              label="Place Bet"
                              v-if="!betPlaced && (status == 'Crashed')"
                              style="width: 100%;"
                    />
                    <p-button type="submit"
                              severity="primary"
                              label="Place Bet"
                              disabled
                              v-else-if="!betPlaced && (status == 'Playing')"
                              style="width: 100%;"
                    />
                    <p-button type="button"
                              @click="onCashout"
                              severity="danger"
                              label="Cashout"
                              outlined
                              v-else-if="betPlaced && (status == 'Playing')"
                              style="width: 100%;"
                    />
                    <p-button type="button"
                              severity="danger"
                              label="Cashout"
                              outlined
                              disabled
                              v-else-if="betPlaced && (status == 'Crashed')"
                              style="width: 100%;"
                    />
                </div>  
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import CrashCoinStatus from '@/model/CrashCoinStatus';
import { PropType, defineComponent } from 'vue';
import { state } from '@/socket'

export default defineComponent({
    name: 'BetControls',
    props: {
        nextGameIn: {
            type: Number,
            required: true
        },
        status: {
            type: String as PropType<CrashCoinStatus>,
            required: true
        },
        betPlaced: {
            type: Boolean,
            required: true
        },
        lastProfit: {
            type: String,
            required: true
        },
        lastBet: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            wager: 0.01,
            payout: 1.00,
            state: state
        }
    },
    methods: {
        onPlaceBet() {
            this.$emit('onPlaceBet', { wager: this.wager, payout: this.payout })
        },
        onCashout() {
            this.$emit('onCashout')
        }
    }
})
</script>

<style scoped lang="scss">
    .bet-controls {
        height: 100%;
        color: white;

        display: flex;
        flex-direction: column;
        .header {
            color: white;
            font-family: dosis;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            padding: 10px 10px 10px 10px;
            border-bottom: 1px solid #CACACA;

            .info {
                transition: all 500ms;
                color: #CACACA;

                &:hover {
                    transform: scale(1.2);
                }
            }

            h3 {
                margin: 0;
            }
        }

        .controls {
            flex: 1;

            .wager-form {
                height: 100%;

                padding: 10px 10px 10px 10px;

                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .form-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    gap: 10px;
                }

                .form-information {
                    height: 100%;

                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;

                    margin: 10px 0px 10px 0px;

                    padding: 10px 10px 10px 10px;

                    background-color: #4D4D4D;
                    border-radius: 5px;
                    font-family: dosis;

                    .balance {
                        width: 100%;

                        display: inline-flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .immediate-history {
                        width: 100%;
                        flex: 1;

                        display: inline-flex;
                        justify-content: space-between;
                        align-items: flex-start;

                        .last-bet {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                        .last-profit {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                        @media only screen and (max-width: 500px),
                                    screen and (max-height: 800px) {
                                        
                            display: none;
                        }
                    }
                    .coins {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                    }
                    #coin-icon {
                        font-size: 2rem;
                        color: gold;
                    }
                    h1 {
                        margin: 0;
                    }
                }
                .form-footer {
                    width: 100%;
                }

                ::v-deep(.p-inputtext) {
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }
            }
        }

        .information-divider {
            @media only screen and (max-width: 500px),
                screen and (max-height: 800px) {
                display: none;
            }
        }
    }
</style>