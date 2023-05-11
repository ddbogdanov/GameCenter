<template>
    <div class="games-grid-container">
        <div class="games-grid">
            <GameCard game-name="Chess" 
                      image-url="https://cdn.hswstatic.com/gif/chess-4.jpg"
            />
            <GameCard game-name="Checkers" 
                      image-url="https://cf.geekdo-images.com/S4IBcWYhlbn51_5f0EIR4g__opengraph/img/iI_-WErPq_25QRsBN4NEfbFnwu4=/fit-in/1200x630/filters:strip_icc()/pic113720.jpg"
            />
            <GameCard game-name="Blackjack" 
                      image-url="https://crescent.edu/uploads/editor/images/Blackjack.png"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameCard from '@/components/GameCard.vue'
export default defineComponent({
  name: 'GamesGrid',
  components: {
    GameCard
  }
});
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
    .games-grid {
        width: 100%;
        padding: 10px 15px 10px 15px;

        display: grid;

        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 300px;
        grid-gap: 20px;
    }
    .games-grid-container {
        width: 100%;

        display: flex;
        justify-content: center;

        overflow: auto;
    }
</style>