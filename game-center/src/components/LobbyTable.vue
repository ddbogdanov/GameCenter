<template>
    <p-table :value="rooms"
             v-model:expandedRows="expandedRows"
             class="p-datatable-sm"
             show-gridlines
    >   
        <p-column-group type="header">
            <p-row>
                <p-column header="Lobbies" :colspan="6"></p-column>
            </p-row>
            <p-row>
                <p-column header=""></p-column>
                <p-column header="Game"></p-column>
                <p-column header="Creator"></p-column>
                <p-column header="Players"></p-column>
                <p-column header="Players Needed"></p-column>
                <p-column header="Actions"></p-column>
            </p-row>
        </p-column-group>

        <p-column expander style="width: 50px;"></p-column>
        <p-column field="game"></p-column>
        <p-column field="creator"></p-column>

        <p-column header="Players">
            <template #body="slotProps">
                <span>{{ slotProps.data.players.length }} / {{ slotProps.data.maxPlayers }}</span>
            </template>
        </p-column>

        <p-column field="playersNeeded"></p-column>

        <p-column style="width: 85px;">
            <template #body="slotProps">
                <p-button severity="primary"
                          size="small"  
                          label="Join"
                          @click="joinGame(slotProps.data)"
                ></p-button>
            </template>
        </p-column>

        <template #expansion="slotProps">
            <div v-for="player of slotProps.data.players" :key="player.username">
                <span>Player: {{ player.username }}</span>
            </div>
        </template>
    
    </p-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'LobbyTable',
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
                },
                {
                    game: 'Chess',
                    creator: 'YoDaddy',
                    playersNeeded: '2',
                    maxPlayers: '2',
                    players: [
                        {
                            username: 'YoDaddy'
                        },
                    ]
                }
            ],
            expandedRows: []
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