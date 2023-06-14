<template>
    <div class="coin-multiplier-container">
        <div class="header">
            <div class="start">
                <h3>Multiplier</h3>
            </div>
            <div class="end">
                <i class="pi pi-info-circle info"
                    v-tooltip.left="'Coin Multiplier. Your bet will be multiplied against this value - unless you dont cash out on time!'"
                />
            </div>
        </div>

        <div class="coin-multiplier">
            <div class="text">
                <span class="multiplier" :class="{ crashed: status == 'Crashed' }">
                    <h1 v-if="(nextGameIn == 0) || ((status == 'Crashed') && (nextGameIn > 6000))">
                        {{ multiplier }}<mark>x</mark>
                    </h1>
                    <h3 v-if="((nextGameIn <= 6000) && !(nextGameIn == 0)) && (status == 'Crashed')" style="color: #CACACA;">
                        Next game in: {{ nextGameIn / 1000 }}s
                    </h3>
                </span>
            </div>
            <div class="bar" :style="{ height: multiplier + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import CrashCoinStatus from '@/model/CrashCoinStatus';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'CoinMultiplier',
    props: {
        multiplier: {
            type: String,
            required: true
        },
        nextGameIn: {
            type: Number,
            required: true
        },
        status: {
            type: String as PropType<CrashCoinStatus>,
            required: true
        }
    },
})
</script>

<style scoped lang="scss">
    .coin-multiplier-container {
        height: 100%;
        width: 100%;

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
    }
    .coin-multiplier {
        height: 100%;
        width: 100%;

        padding: 10px 10px 10px 10px;

        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .text {
            color: white;
            font-family: dosis;
            font-size: 3rem;

            position: absolute;
            z-index: 1001;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            

            .multiplier {
                display: inline-flex;
                align-items: baseline;
                gap: 10px;

                &.crashed {
                    color: #da2400;
                }
                h1 {
                    margin: 0;
                }
                mark {
                    all: unset;

                    font-family: dosis;
                    font-size: 3rem;
                    font-weight: 400;
                    color: #CACACA;

                    right: 0;
                }
            }
        }
        .bar {
            background-color: var(--primary-color);
            border-radius: 5px;
        }
    }
</style>