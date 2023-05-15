<template>
    <div class="play-options-header">
        <h1 style="margin: 0;">{{ gameName }}</h1>
        <span>
            <small>{{ activePlayers }}</small>
            <i class="pi pi-users" style="padding-left: 5px; font-size: 1.5rem;"/>
        </span>
    </div>

    <div class="play-options">

        <p-button label="Join a Game"
                  severity="primary"
                  icon="pi pi-play"
                  icon-pos="right"
                  class="option-button"

                  disabled
        />
        <p-button label="Start a New Game"
                  severity="success"
                  icon="pi pi-plus-circle"
                  icon-pos="right"
                  outlined
                  class="option-button"
                  @click="onNewGame"
        />
        <p-button label="View All Games"
                  severity="info"
                  icon="pi pi-list"
                  icon-pos="right"
                  outlined
                  class="option-button"
                  @click="onViewAll"
        />

        <p-divider/>

        <span class="p-inputgroup">
            <span class="p-float-label">
                <p-input-text id="gameID" 
                              v-model="gameID"

                              disabled
                />
                <label for="gameID">Join With Game Code</label>
            </span>

            <p-button icon="pi pi-chevron-right"
                      severity="primary"
                      primary

                      disabled
            />
        </span>

    </div>
</template>

<script lang="ts">
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import { defineComponent } from 'vue';
import { socket, state } from '@/socket'
import Room from '@/model/Room';

export default defineComponent({
    name: 'PlayOptions',
    inject: ['dialogRef'],
    data() {
        return {
            gameName: '',
            activePlayers: 0,
            gameID: ''
        }
    },
    mounted() {
        this.gameName = (this.dialogRef as DynamicDialogInstance).data.gameName
        this.activePlayers = (this.dialogRef as DynamicDialogInstance).data.activePlayers
    },
    methods: {
        onNewGame() {
            socket.emit(`new${this.gameName.replace(/\s+/g, '')}Game`, 
                        state.session.user, 
                        (res: Room) => {
                            console.log(res.roomID)
                        })
            
            this.closeSelf()
            this.$router.push({ path: `${this.gameName.replace(/\s+/g, '').toLowerCase()}`})
        },
        onViewAll() {
            this.closeSelf()
            this.$router.push({ path: '/lobby', query: {game: this.gameName}})
        },
        closeSelf() {
            (this.dialogRef as DynamicDialogInstance).close()
        }
    }
})
</script>

<style scoped lang="scss">
    .play-options-header {
        display: inline-flex;
        justify-content: space-between;
        align-items: baseline;

        width: 100%;
        padding: 0px 10px 10px 10px;

        font-family: dosis;
        font-size: 1.5rem;

        h1 {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .play-options {
        display: flex;
        flex-direction: column;
        gap: 30px;

        padding: 10px 10px 10px 10px;
    }
    .option-button {
        transition: all 0.2s ease-in-out;

        &:hover {
            transform: scale(1.1, 1.1)
        }
    }
</style>