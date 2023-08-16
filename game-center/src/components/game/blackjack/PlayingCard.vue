<template>
    <div class="playing-card" :class="{ 'face-down': isFaceDown }">
        <div class="front">
            <div class="top">
                <div class="value">
                    <h1>{{ displayValue }}</h1>
                    <PlayingCardSuit :suit="card.suit"/>
                </div>
            </div>

            <PlayingCardSuit :suit="card.suit" :size="'large'"/>

            <div class="bottom">
                <div class="value">
                    <h1>{{ displayValue }}</h1>
                    <PlayingCardSuit :suit="card.suit"/>
                </div>
            </div>
        </div>

        <div class="back"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '@/model/card/Card'
import PlayingCardSuit from './PlayingCardSuit.vue'

export default defineComponent({
    name: 'PlayingCard',
    components: {
        PlayingCardSuit
    },
    props: {
        card: {
            type: Object as PropType<Card>,
            required: true
        },
        isFaceDown: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        displayValue() {
            switch (this.card.value.name.toUpperCase()) {
                case 'JACK': 
                    return 'J'
                case 'QUEEN':
                    return 'Q'
                case 'KING':
                    return 'K'
                case 'ACE':
                    return 'A'
                default:
                    return this.card.value.weight
            }
        }
    }
})
</script>

<style scoped lang="scss">
    .playing-card {
        width: 8rem;
        height: 12rem;

        position: relative;

        border-radius: 10px;
        overflow: hidden;

        transition: all 0.2s ease;

        .front {
            width: 100%;
            height: 100%;

            padding: 0px 5px 0px 5px;

            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            background-color: whitesmoke;

            border: 1px solid rgb(46, 46, 46);
            border-radius: 10px;

            backface-visibility: hidden;
            transition: all 0.2s ease;

            .top, .bottom {
                width: 100%;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .bottom {
                transform: rotate(180deg);
            }

            h1 {
                font-size: 2.5rem;
                margin: 0;
            }
        }
        .back {
            height: 100%;

            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;

            padding: 10px 10px 10px 10px;

            background: whitesmoke;
            background-image: url('@/assets/card/card_back.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            border: 1px solid rgb(46, 46, 46);
            border-radius: 10px;

            backface-visibility: hidden;
            transition: all 0.2s ease;
            transform: rotateY(-180deg);
        }
        &.face-down {
            .front {
                transform: rotateY(180deg);
            }
            .back {
                transform: rotateY(0deg);
            }
        }

        .value {
            font-family: dosis;
            font-size: 1.5rem;
        }
    }
</style>