<template>
    <div class="nav-bar">
        <div class="start">
            <img src="@/assets/boardgamesicon_white.png" class="logo" @click="this.$router.push('home')"/>
        </div>
        <div class="end">
            <ProfilePopover/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfilePopover from "./ProfilePopover.vue";

export default defineComponent({
    name: 'NavBar',
    components: {
        ProfilePopover
    },
    methods: {

    }
})
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
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

        display: flex;
        align-items: center;
    }
    .nav-bar .end {
        padding-right: 10px;

        display: flex;
        align-items: center;
    }
    .logo {
        height: 45px;
        cursor: pointer;
    }
</style>