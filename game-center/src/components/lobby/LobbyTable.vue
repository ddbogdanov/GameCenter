<template>
    <p-table :value="rooms"
             v-model:expandedRows="expandedRows"
             class="p-datatable-sm"
             show-gridlines
             striped-rows
             scrollable
             removableSort
             scroll-height="flex"
             :loading="loading"
             v-model:filters="filters"
             dataKey="roomID" 
             filterDisplay="menu"
             :globalFilterFields="['game.name', 'roomID']"
    >   
        <template #loading>
            <div class="loading">
                <p-progress-spinner/>
                <h1>Loading rooms. Please wait.</h1>
            </div>
        </template>
        <template #empty> 
                <h1 style="font-family: dosis">No rooms found.</h1>
        </template>

        <template #header>
            <div class="table-header">
                <h1>Rooms</h1>
                <div class="header-end">
                    <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <p-input-text v-model="this.filters['global'].value" 
                                  placeholder="Search by Room ID or Game"
                                  style="width: 250px;"
                                  type="text"
                    />
                    <p-button icon="pi pi-refresh"
                              severity="info"
                              outlined
                              rounded
                              style="margin-left: 10px;"
                              v-tooltip.left="'Refresh'"
                              @click="onRequestRefresh"
                    />
                </span>
                </div>
            </div>
        </template>

        <p-column expander style="width: 50px;"></p-column>
        <p-column header="Game" field="game.name"></p-column>
        <p-column header="Room ID" field="roomID"></p-column>

        <p-column header="Players" field="users.length" sortable>
            <template #body="slotProps">
                <span>{{ slotProps.data.users.length }} / {{ slotProps.data.game.maximumUsers }}</span>
            </template>
        </p-column>

        <p-column header="Players Needed" field="game.minimumUsers" sortable></p-column>
        <p-column header="Status" field="status">
            <template #body="slotProps">
                <p-tag :value="slotProps.data.status" :severity="statusSeverity(slotProps.data.status)"/>
            </template>
        </p-column>

        <p-column header="Actions" style="width: 85px;">
            <template #body="slotProps">
                <p-button severity="primary"
                          size="small"  
                          label="Join"
                          style="width: 100%;"
                          outlined
                          @click="joinRoom(slotProps.data)"
                ></p-button>
            </template>
        </p-column>

        <template #expansion="slotProps">
            <p-table :value="slotProps.data.users"
                     striped-rows
                     class="p-datatable-sm"
            >
                <p-column header="Players" field="username"/>
            </p-table>
        </template>
    
    </p-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { socket, state } from '@/socket'
import { getStatusSeverity } from '@/utils';
import Room from '@/model/Room';
import Status from '@/model/Status';

export default defineComponent({
    name: 'LobbyTable',
    props: {
        rooms: {
            type: Object as PropType<Room[]>,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            expandedRows: [],
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        }
    },
    created() {
        (this.filters['global'] as any).value = this.$route.query.game
    },
    methods: {
        joinRoom(scope: any) {
            socket.emit('joinRoom', { roomID: scope.roomID, session: state.session }, (res: Room) => {
                if(!res.game) {
                    this.$toast.add({ 
                        severity: 'error',
                        summary: 'Error', detail: res,
                        life: 2000 
                    })
                    return
                }
                state.room = res
                this.$router.push(`/${scope.game.name}`)
            })
        },
        onRequestRefresh() {
            this.$emit('refresh')
        },
        statusSeverity(status: Status) {
            return getStatusSeverity(status)
        }
    },
});
</script>

<style scoped lang="scss">
    .loading {
        font-family: dosis;
        color: white;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .table-header {
        width: 100%;
        font-family: dosis;
        font-weight: 900;

        display: inline-flex;
        justify-content: space-between;
        align-items: center;
    }
</style>