<template>
    <div class="coin-multiplier-container">
        <div class="header">
            <div class="start">
                <h3>Multiplier</h3>
            </div>
            <div class="end">
                <i class="pi pi-info-circle info"
                    style="color: #cacaca"
                    v-tooltip.left="'Coin Multiplier. Bets will be multiplied against this value.'"
                />
            </div>
        </div>

        <div class="coin-multiplier">
            <div class="text">
                <span class="multiplier">
                    <h1 style="padding-left: 10px;">{{ multiplier }}</h1>
                    <mark>x</mark>
                </span>
            </div>
            <div class="bar" :style="{ height: multiplier + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CoinMultiplier',
    props: {
        multiplier: {
            type: String,
            required: true
        },
    },
})
</script>

<style scoped lang="scss">
    .coin-multiplier-container {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }
    .header {
        color: white;
        font-family: dosis;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 10px 10px 10px 10px;
        border-bottom: 1px solid #cacaca;

        h3 {
            margin: 0;
        }
    }
    .info {
        transition: all 500ms;

        &:hover {
            transform: scale(1.2);
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

                h1 {
                    margin: 0;
                }
                mark {
                    all: unset;

                    font-family: dosis;
                    color: #cacaca;

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