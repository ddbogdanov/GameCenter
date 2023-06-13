<template>
    <div class="bet-controls">
        <div class="header">
            <div class="start">
                <h3>Controls</h3>
            </div>
            <div class="end">
                <i class="pi pi-info-circle info"
                    v-tooltip.left="'Controls to place bets'"
                />
            </div>
        </div>

        <div class="controls">
            <form @submit.prevent="onWager()" class="wager-form">

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
                        <span class="p-inputgroup-addon">Cashout</span>
                        <p-input-number v-model="cashout"
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
        }
    },
    data() {
        return {
            wager: 0.01,
            cashout: 1.00,
        }
    },
    methods: {
        onWager() {
            console.log('wager', this.wager)
            this.$emit('onBetPlaced')
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
            border-bottom: 1px solid #cacaca;

            .info {
                transition: all 500ms;
                color: #cacaca;

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
                .form-footer {
                    width: 100%;
                }

                ::v-deep(.p-inputtext) {
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                }
            }
        }
    }
</style>