<template>
    <el-table :data="rooms" style="width: 100%;">
        <el-table-column type="expand">
            <template #default="props">
                <div v-for="player of props.row.players" :key="player.username">
                    <span>Player: {{ player.username }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="game" label="Game"/>
        <el-table-column prop="creator" label="Creator"/>
        <el-table-column label="Players">
            <template #default="scope">
                <span>{{ scope.row.players.length }} / {{ scope.row.maxPlayers }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="playersNeeded" label="Players Needed"/>
        <el-table-column label="Actions">
            <template #default="scope">
                <el-button
                    type="primary"
                    @click="joinGame(scope)"
                >Join</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from '@/socket'
export default defineComponent({
    name: 'LobbyTable',
    created() {
        console.info('created')
    },  
    data() {
        return {
            rooms: [
                {
                    game: 'Chess',
                    creator: 'YoureMom',
                    playersNeeded: '2',
                    maxPlayers: '2',
                    players: [
                        {
                            username: 'YoureMom'
                        },
                    ]
                }
            ]
        }
    },
    methods: {
        joinGame(scope: unknown) {
            console.log(`Joining Game ${scope}`)
        }
    } 
});
</script>
<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>