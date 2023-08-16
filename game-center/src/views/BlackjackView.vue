<template>
    <div style="height: 100%">
        <NavBar/>
        <div class="blackjack">

            <div style="color: white; padding-bottom: 20px; text-align: center;">
                <h1>Still WIP...</h1>
                <p>But the card animation is cool! :) hover over the cards.</p>
            </div>

            <PlayingHand :hand="hand"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navbar/NavBar.vue';
import Card from '@/model/card/Card';
import PlayingHand from '@/components/game/blackjack/PlayingHand.vue';

export default defineComponent({
    name: 'BlackjackView',
    components: {
        NavBar,
        PlayingHand
    },
    data() {
        return {
            hand: [
                { suit: 'Diamonds', value: { name: 'Ace', weight: 1 }},
                { suit: 'Diamonds', value: { name: 'Two', weight: 2 }},
                { suit: 'Diamonds', value: { name: 'Three', weight: 3 }},
                { suit: 'Diamonds', value: { name: 'Four', weight: 4 }},
                { suit: 'Diamonds', value: { name: 'Five', weight: 5 }},
                { suit: 'Diamonds', value: { name: 'Six', weight: 6 }},
                
                { suit: 'Hearts', value: { name: 'Seven', weight: 7 }},
                { suit: 'Hearts', value: { name: 'Eight', weight: 8 }},
                { suit: 'Hearts', value: { name: 'Nine', weight: 9 }},
                { suit: 'Hearts', value: { name: 'Ten', weight: 10 }},
                { suit: 'Hearts', value: { name: 'Jack', weight: 11 }},
                { suit: 'Hearts', value: { name: 'Queen', weight: 12 }},
                { suit: 'Hearts', value: { name: 'King', weight: 13 }},
                
                { suit: 'Clubs', value: { name: 'Ace', weight: 1 }},
                { suit: 'Clubs', value: { name: 'Two', weight: 2 }},
                { suit: 'Clubs', value: { name: 'Three', weight: 3 }},
                { suit: 'Clubs', value: { name: 'Four', weight: 4 }},
                { suit: 'Clubs', value: { name: 'Five', weight: 5 }},
                { suit: 'Clubs', value: { name: 'Six', weight: 6 }},

                { suit: 'Spades', value: { name: 'Seven', weight: 7 }},
                { suit: 'Spades', value: { name: 'Eight', weight: 8 }},
                { suit: 'Spades', value: { name: 'Nine', weight: 9 }},
                { suit: 'Spades', value: { name: 'Ten', weight: 10 }},
                { suit: 'Spades', value: { name: 'Jack', weight: 11 }},
                { suit: 'Spades', value: { name: 'Queen', weight: 12 }},
                { suit: 'Spades', value: { name: 'King', weight: 13 }},
            ]
        }
    },
    methods: {

    }
})
</script>

<style scoped lang="scss">
    .blackjack {
        width: 100%;
        height: calc(100% - 60px);

        padding: 10px 10px 10px 10px;

        background-color: #363636;

        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;
    }
</style>