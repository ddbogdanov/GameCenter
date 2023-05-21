<template>
    <div class="home-header">
        <h1>Games</h1>

        <span class="p-inputgroup" style="width: 350px;">
            <p-button label="All Rooms"
                    severity="primary"
                    outlined
                    icon="pi pi-list" 
                    iconPos="left"
                    @click="onViewAllRooms"
            />
            <p-input-text placeholder="Or Join With Room ID"
                          v-model="roomID"
            />
            <p-button icon="pi pi-chevron-right"
                      severity="primary"
                      outlined
                      @click="onJoinWithRoomID"
            />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket, state } from '@/socket'
import Room from '@/model/Room';

export default defineComponent({
  name: 'HomeHeader',
  data() {
    return {
        roomID: ''
    }
  },
  methods: {
    onViewAllRooms() {
        this.$router.push('/lobby')
    },
    onJoinWithRoomID() {
        socket.emit('joinRoom', { roomID: this.roomID, session: state.session }, (res: Room) => {
            state.room = res
            this.$router.push(`/${res.game.name}`)
        })
    }
  }
});
</script>

<style scoped lang="scss">
    h1 {
        margin: 0;
    }
    .home-header {
        width: inherit;
        height: 60px;

        padding: 0px 10px 0px 10px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        position: fixed;
        z-index: 3;

        color: white;
        font-family: dosis;

        
        border-radius: 0px 0px 15px 15px;

        backdrop-filter: blur(10px);
        background-color: #363636de;
    }

    input {
        background: transparent;
        color: var(--primary-color);


    }
    ::placeholder {
        color: white;
    }
</style>