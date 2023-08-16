<template>
    <div class="suit">
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="suit-clubs" viewBox="0 0 60 60">    
                <circle cx="18" cy="35" r="14"/>
                <circle cx="30" cy="15" r="14"/>
                <circle cx="42" cy="35" r="14"/>
                <path d="M30,30 Q 30,50 20,60 H40 Q30,50 30,30"/>
            </symbol>

            <symbol id="suit-diamonds" viewBox="0 0 60 60">
                <rect x="10" y="10" width="40" height="40" 
                      transform="rotate(45,30,30)" 
                />
            </symbol>
            
            <symbol id="suit-hearts" viewBox="0 0 600 600">
                <g transform="rotate(45,300,300)">
                    <rect x="150" y="150" height="350" width="350"/>
                    <circle cx="150" cy="325" r="175"/>
                    <circle cx="325" cy="150" r="175"/>
                </g>
            </symbol>

            <symbol id="suit-spades" viewBox="0 0 60 60">
                <g transform="rotate(225,30,30)">
                    <rect width="30" height="30" x="20" y="20"/>
                    <circle cx="20" cy="35" r="15"/>
                    <circle cx="35" cy="20" r="15"/>
                </g>

                <path d="M30,30 Q30,50 20,60 H40 Q30,50 30,30"/>
            </symbol>
        </svg>

        <svg :class="size == 'large' ? 'large' : '' ">
            <use :xlink:href="'#suit-' + suit.toLowerCase()" :fill="fillColor"></use>
        </svg>
    </div>
</template>

<script lang="ts">
import CardSuit from '@/model/card/CardSuit';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'PlayingCardSuit',
    props: {
        suit: {
            type: String,
            required: true
        },
        size: {
            type: String as PropType<'small' | 'large'>,
            default: 'small'
        }
    },
    computed: {
        fillColor() {
            if(this.suit == CardSuit.CLUBS || this.suit == CardSuit.SPADES) {
                return 'black'
            }
            return 'red'
        }
    }
})
</script>

<style scoped lang="scss">
    .suit {
        svg {
            width: 1rem;
            height: 1rem;

            &.large {
                width: 3rem;
                height: 3rem;
            }

            display: block;
            margin: auto;
        }
    }
</style>