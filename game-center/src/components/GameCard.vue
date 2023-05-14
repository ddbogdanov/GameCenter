<template>
    <div class="game-card" @click="onPlay">
        <div class="card-header">
            <img :src="imageUrl"
                    class="image"
            />
        </div>
        <div class="card-content">
            <h1 style="margin: 0;">{{ gameName }}</h1>
            <p-button icon="pi pi-chevron-right"
                      severity="primary"
                      size="small"
                      rounded
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

const PlayOptions = defineAsyncComponent(() => import('@/components/PlayOptions.vue'))

export default defineComponent({
    name: 'GameCard',
    props: {
        gameName: String,
        imageUrl: String,
    },
    methods: {
        onPlay() {
           this.$dialog.open(PlayOptions, {
                props: {
                    style: {
                       width: '300px',
                    },
                    modal: true,
                    dismissableMask: true,
                    closable: false,
                    draggable: false
                },
                data: {
                    gameName: this.gameName,
                    activePlayers: 0
                }
           })
        }
    }
})
</script>

<style scoped lang="scss">
    .game-card {
        width: 100%;
        height: 100%;

        font-family: dosis;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 2px 2px 10px 1px #3f3f3f;

        cursor: pointer;

        transition: all .2s ease-in-out;
      
        &:hover {
            transform: scale(1.05, 1.05);
            box-shadow: .5px .5px 5px 0px var(--primary-color);
        }
    }
    .card-header {
        height: 80%;
    }
    .card-content {
        width: 100%;
        height: 20%;

        padding: 0 10px 0 10px;

        background-color: #363636;
        color: white;

        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        box-shadow: 0px -5px 8px 0px #363636;
    }
    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;

        position: relative;
        z-index: -1;
    }
</style>
<style lang="scss">

</style>