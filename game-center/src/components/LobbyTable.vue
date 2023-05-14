<template>
    <p-table :value="rooms"
             v-model:expandedRows="expandedRows"
             class="p-datatable-sm"
             show-gridlines
    >   
        <p-column-group type="header">
            <p-row>
                <p-column header="Rooms" :colspan="6"></p-column>
            </p-row>
            <p-row>
                <p-column header=""></p-column>
                <p-column header="Game"></p-column>
                <p-column header="Room ID"></p-column>
                <p-column header="Players"></p-column>
                <p-column header="Players Needed"></p-column>
                <p-column header="Actions"></p-column>
            </p-row>
        </p-column-group>

        <p-column expander style="width: 50px;"></p-column>
        <p-column field="game.name"></p-column>
        <p-column field="roomID"></p-column>

        <p-column header="Players">
            <template #body="slotProps">
                <span>{{ slotProps.data.users.length }} / {{ slotProps.data.game.maximumUsers }}</span>
            </template>
        </p-column>

        <p-column field="game.minimumUsers"></p-column>

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
            <div v-for="user of slotProps.data.users" :key="user.userID">
                <span>Player: {{ user.username }}</span>
            </div>
        </template>
    
    </p-table>
</template>

<script lang="ts">
import Room from '@/model/Room';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'LobbyTable',
    props: {
        rooms: {
            type: Object as PropType<Room[]>,
            required: true
        }
    },
    data() {
        return {
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

<style scoped lang="scss">

</style>