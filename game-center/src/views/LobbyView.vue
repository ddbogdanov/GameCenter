<template>
    <div style="height: 100%;">
        <NavBar/>
        <div class="lobby">
            <div class="lobby-content">
                <LobbyHeader/>
                <div class="table">
                    <LobbyTable :rooms="this.rooms" :loading="loading" @refresh="getAllRooms"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue'
import LobbyTable from '@/components/lobby/LobbyTable.vue'
import LobbyHeader from '@/components/lobby/LobbyHeader.vue'
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
            rooms: [] as Room[],
            loading: true
        }
    },
    created() {
        this.getAllRooms()
    },
    methods: {
        getAllRooms() {
            this.loading = true
            socket.emit('getAllRooms', (res: Room[]) => {
                this.rooms = res
                this.loading = false
            })
        }
    }
});
</script>

<style scoped lang="scss">
    .lobby {
        height: calc(100% - 60px);
        width: 100%;

        display: flex;
        justify-content: center;
        
        background-color: #f77f71;
    }   
    .lobby-content {
        width: 60%;
        height: 100%;

        @media only screen and (max-width: 1100px) {
            width: 80%
        }
        @media only screen and (max-width: 800px) {
            width: 100%
        }
    }
    .table {
        height: 100%;
        padding: 75px 0px 25px 0px;
    }
</style>