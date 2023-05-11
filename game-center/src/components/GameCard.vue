<template>
    <div class="game-card">
        <div class="card-header">

            <div class="image-container">
                <img :src="imageUrl"
                     class="image"
                />
            </div>

        </div>
        <div class="card-content">

            <h2 style="margin: 0;">{{ gameName }}</h2>
            <p-button icon="pi pi-chevron-right"
                      severity="primary"
                      size="small"
                      rounded
                      v-tooltip.left="'Play'"
            />

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'GameCard',
    props: {
        gameName: String,
        imageUrl: String,
    },
    methods: {
        onPlay() {
            this.$router.push('/lobby')
        }
    }
})
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
    .game-card {
        width: 100%;
        height: 100%;

        border-radius: 10px;
        overflow: hidden;

        box-shadow: 2px 2px 10px 1px #3f3f3f;
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
    }
    .image-container {
        height: 100%;
    }
    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
<style lang="scss">

</style>