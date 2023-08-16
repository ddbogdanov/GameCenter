<template>
    <div class="games-grid-container">
        <p-scroll-panel class="games-scroll">
            <div class="games-grid">
                <GameCard game-name="Chess" 
                          image-url="/chess.jpg"

                          :can-join-existing="false"
                          :can-start-new="true"
                          :can-view-all="true"
                />
                <GameCard game-name="CrashCoin"
                          image-url="/crashcoin.jpg"

                          :can-join-existing="true"
                          :can-start-new="false"
                          :can-view-all="false"
                />
                <GameCard game-name="Blackjack" 
                          image-url="/blackjack.png"

                          :can-join-existing="false"
                          :can-start-new="true"
                          :can-view-all="true"
                />
                <GameCard game-name="Checkers" 
                          image-url="/checkers.jpg"

                          :can-join-existing="true"
                          :can-start-new="true"
                          :can-view-all="true"

                          class="disabled"
                />
            </div>
        </p-scroll-panel>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameCard from '@/components/home/GameCard.vue'
export default defineComponent({
  name: 'GamesGrid',
  components: {
    GameCard
  }
});
</script>

<style scoped lang="scss">
    .games-grid-container {
        width: 100%;
        height: calc(100%);

        display: flex;
        justify-content: center;
        overflow: auto;
    }
    .games-grid {
        width: 100%;
        padding: 75px 20px 15px 20px;

        display: grid;

        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 300px;
        grid-gap: 20px;

        @media only screen and (min-width: 1500px) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media only screen and (max-width: 700px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media only screen and (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
    .games-scroll {
        height: 100%;
    
        box-shadow: 15px 15px 15px 15px #363636;
    }

    ::v-deep(.p-scrollpanel.games-scroll .p-scrollpanel-bar) {
        background-color: #6ab2bd;
        opacity: 0.8;
        transition: background-color 0.3s, opacity 0.3s;
    }
    ::v-deep(.p-scrollpanel.games-scroll .p-scrollpanel-bar:hover) {
        background-color: #55a5b1;
        opacity: 1;
    }

    .disabled {
        filter: blur(2px) grayscale(100%);

        pointer-events: none;
        touch-action: none;
    }
    .disabled:active {
        pointer-events: none;
    }
</style>