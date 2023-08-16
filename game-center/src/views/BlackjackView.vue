<template>
    <div style="height: 100%">
        <NavBar/>
        <div class="blackjack">
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
            hand: [{ suit: 'Hearts', value: { name: 'King', weight: 10 }} as Card, new Card(), { suit: 'Diamonds', value: { name: 'Ten', weight: 10 }} as Card],
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
    }
</style>