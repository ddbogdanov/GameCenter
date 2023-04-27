<template>
    <el-card class="game-card"
             shadow="hover"
             :body-style="{ padding: '0px', height: '100%' }"
    >
        <div class="image-container">
            <img :src="imageUrl"
                 class="image"
            />
        </div>
        <el-row class="game-info-row" justify="space-between" align="middle">
            <h2 style="margin: 0">{{ gameName }}</h2>
            <el-tooltip content="Play" placement="left">
                <el-button type="primary"
                       :icon="CaretRight"
                       size="large"
                       circle
                       @click="onPlay()"
                ></el-button>
            </el-tooltip>
        </el-row>
    </el-card>
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
  import { CaretRight } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
    .game-card {
        font-family: dosis;
        width: 100%;
        height: 100%;
        color: white;
        border: 0;
    }
    .image-container {
        height: 80%;
    }
    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .game-info-row {
        height: 20%;
        padding-left: 10px;
        padding-right: 10px;

        background-color: #363636;
    }
</style>
<style lang="scss">
    // .el-card__header {
    //     padding: 0;
    //     background: red !important;
    // }
</style>