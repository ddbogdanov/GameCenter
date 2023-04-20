<template>
    <div class="games-grid">
        <div v-for="i in 8" :key="i">
            <el-card>
                <template #header>
                    <h2>Title {{ i }}</h2>
                </template>
                <div>
                    Card Content {{ i }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">

</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
    .games-grid {
        display: grid;
  
        grid-template-columns: repeat(3, 25%);
        grid-template-rows: auto;
        grid-gap: 20px;
    }
</style>