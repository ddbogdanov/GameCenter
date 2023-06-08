<template>
    <NavBar/>

    <div class="crash-coin">
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket, state } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar
    }
})
</script>

<style lang="scss">
.crash-coin {
    width: 100%;
    height: calc(100% - 60px);
}
</style>