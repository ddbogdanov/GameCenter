<template>
    <div class="nav-bar">
        <div class="start">
            <img src="@/assets/boardgamesicon_white.png" class="logo" @click="this.$router.push('landing')"/>
        </div>
        <div class="end">
            <el-button type="danger" @click="disconnectSocket">Disconnect</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'NavBar',
    methods: {

    }
})
</script>
<script setup lang="ts">
import { defineComponent } from 'vue';
import { disconnect } from "@/socket";

const { disconnectSocket } = disconnect()
</script>

<style lang="scss">
    .nav-bar {
        position: relative;
        z-index: 10;

        width: 100%;
        height: 60px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        background-color: #363636;

        box-shadow: 0px 3px 8px #303030cb;
    }
    .nav-bar .start {
        padding-left: 10px;
    }
    .nav-bar .end {
        padding-right: 10px;
    }
    .logo {
        height: 45px;
        cursor: pointer;
    }
</style>