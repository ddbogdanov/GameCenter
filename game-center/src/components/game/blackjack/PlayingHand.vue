<template>
    <div class="playing-hand">
        <TransitionGroup name="hand" 
                        tag="div" 
                        class="hand-container" 
                        :style="{'grid-template-columns': `repeat(${hand.length - 1}, 30px) min-content`}"
        >
            <div class="hand-card"
                v-for="(card, index) in hand" 
                :key="index" 
                :style="{'z-index': index}"
            >
                <PlayingCard :card="card" :is-face-down="false"/>   
            </div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PlayingCard from './PlayingCard.vue';
import Card from '@/model/card/Card';

export default defineComponent({
    name: 'PlayingHand',
    props: {
        hand: {
            type: Object as PropType<Array<Card>>,
            required: true
        }
    },
    components: {
        PlayingCard
    },
    computed: {
        handTotal() {
            let total = 0
            this.hand.forEach((card) => {
                total = total + card.value.weight
            })
            return total
        }
    },
})
</script>

<style scoped lang="scss">
    .playing-hand {
        
        .hand-container {
            display:  grid;
            grid-gap: 0.5rem;
            transition: grid-template-columns 0.5s;

            .hand-card {
                transition: all 500ms ease;

                &:hover {
                    transform: translateY(-10px) translateX(-5px)
                }
            }
        }
    }

    .hand-move,
    .hand-enter-active,
    .hand-leave-active {
        transition: all 0.5s ease;
    }

    .hand-enter-from,
    .hand-leave-to {
        opacity: 0;
        transform: translateY(-120px);
    }
</style>

