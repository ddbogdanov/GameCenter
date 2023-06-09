<template>
    <div style="height: 100%;">
        <NavBar/>

        <div class="crash-coin">
            <h1>Next Game In: {{ nextGameIn }}</h1>
            <h1>Multiplier: {{ multiplier }}x</h1>
            <p v-for="(crash, index) of crashes" :key="index"> {{ crash }}</p>
        </div>
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
    },
    data() {
        return {
            multiplier: 1.00,
            crashes: [] as Array<any>,
            nextGameIn: 0,
        }
    },
    created() {
        socket.on('multiplierUpdate', (data) => {
            this.multiplier = data
        })
        socket.on('gameEnd', (data) => {
            this.crashes.push(data)
        })
        socket.on('nextGameIn', (data) => {
            this.nextGameIn = data
        })
    }
})
</script>

<style lang="scss">
.crash-coin {
    width: 100%;
    height: calc(100% - 60px);
}
</style>