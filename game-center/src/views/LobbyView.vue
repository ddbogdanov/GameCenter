<template>
    <NavBar/>
    <div class="lobby">
        <LobbyHeader/>
        <div class="table">
            <LobbyTable :rooms="this.rooms"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue'
import LobbyTable from '@/components/LobbyTable.vue'
import LobbyHeader from '@/components/LobbyHeader.vue'
import Room from '@/model/Room';


export default defineComponent({
    name: 'LobbyView',
    components: {
        NavBar,
        LobbyTable,
        LobbyHeader
    },
    data() {
        return {
            rooms: [] as Room[]
        }
    },
    created() {
        socket.emit('getAllRooms', (res: Room[]) => {
            this.rooms = res
        })
    }
});
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">
    .lobby {
        height: calc(100% - 60px);
        width: 100%;

        display: flex;
        justify-content: center;
        
        background-color: #f77f71;
    }   
    .table {
        padding-top: 75px;

        width: 100%;

        @media only screen and (max-width: 1100px) {
            width: 80%
        }
        @media only screen and (max-width: 800px) {
            width: 100%
        }
    }
</style>