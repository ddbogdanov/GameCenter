<template>
    <div class="games-grid-container">
        <p-scroll-panel class="games-scroll">
            <div class="games-grid">
                <GameCard game-name="Chess" 
                          image-url="https://cdn.hswstatic.com/gif/chess-4.jpg"

                          :can-join-existing="false"
                          :can-start-new="true"
                          :can-view-all="true"
                />
                <GameCard game-name="Checkers" 
                          image-url="https://cf.geekdo-images.com/S4IBcWYhlbn51_5f0EIR4g__opengraph/img/iI_-WErPq_25QRsBN4NEfbFnwu4=/fit-in/1200x630/filters:strip_icc()/pic113720.jpg"

                          :can-join-existing="true"
                          :can-start-new="true"
                          :can-view-all="true"

                          class="disabled"
                />
                <GameCard game-name="Blackjack" 
                          image-url="https://crescent.edu/uploads/editor/images/Blackjack.png"

                          :can-join-existing="true"
                          :can-start-new="true"
                          :can-view-all="true"

                          class="disabled"
                />
                <GameCard game-name="CrashCoin"
                          image-url="https://t4.ftcdn.net/jpg/05/62/27/09/360_F_562270957_OS3T9bvFuujUYyzd9JYHkVz6KgGo55No.jpg"

                          :can-join-existing="true"
                          :can-start-new="false"
                          :can-view-all="false"
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
    }
    .disabled:active {
        pointer-events: none;
    }
</style>