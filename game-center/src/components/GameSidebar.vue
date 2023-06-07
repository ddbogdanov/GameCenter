<template>
    <div class="game-sidebar">
        <div class="sidebar-start">
            <div class="header">
                <div class="game-status">
                    <div class="game-name">
                        <h1>{{ state.room.game.name }}</h1> 
                        <p-tag :severity="this.statusSeverity" :value="state.room.status"/>
                    </div>
                    <h2><mark class="username">{{ state.room.currentTurn }}</mark>'s turn</h2>
                </div>
                
                <div class="room-id p-ripple"
                     v-ripple
                     v-tooltip="'Click to copy'"
                     @click="onCopyToClipboard(state.room.roomID)"
                >
                    <h2>Room ID</h2>
                    <h1><mark>{{ state.room.roomID }}</mark></h1>
                </div>
            </div>

            <p-divider/>

            <div class="player-information-container">
                <h2>Players</h2>
                <div class="player-information">
                    <div class="player" 
                         v-for="user in state.room.users" 
                         :key="user.userID"
                    >
                        <PlayerAvatar size="large"
                                      shape="circle"
                                      :avatar-id="user.avatarID"
                                      :background-color="user.avatarBackgroundColor"
                        />
                        <p>{{ user.username }}</p>
                    </div>
                </div>
            </div>

            <p-divider/>

            <p-tab-view class="sidebar-tab-view">
                <p-tab-panel header="Game">
                    <div class="game-information">
                        <p-table :value="moveHistory"
                                 class="p-datatable-sm"
                                 scrollable
                                 scrollHeight="flex"
                        >
                            <template #header>
                                <span>Move History</span>
                            </template>

                            <p-column field="user" header="Player"/>
                            <p-column field="move" header="Move"/>
                        </p-table>
                    </div>
                </p-tab-panel>

                <p-tab-panel header="Chat">
                    <UserChat :roomID="state.room.roomID"/>
                </p-tab-panel>
            </p-tab-view>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import { getStatusSeverity } from '@/utils';
import Status from '@/model/Status'
import UserChat from './UserChat.vue';
import PlayerAvatar from './PlayerAvatar.vue';

export default defineComponent({
    name: 'ChessView',
    components: {
        UserChat,
        PlayerAvatar
    },
    props: {
        readyToStart: {
            type: Boolean,
            required: true
        },
        moveHistory: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            state: state,
            Status: Status
        }
    },
    computed: {
        statusSeverity() {
            return getStatusSeverity(this.state.room.status)
        },
    },
    methods: {
        onCopyToClipboard(text: string) {
            navigator.clipboard.writeText(text)
            .then(() =>{
                this.$toast.add({ 
                    severity: 'success',
                    summary: 'Success', detail: 'Room ID copied to clipboard!',
                    life: 2000 
                })
            })
            .catch(() => {
                this.$toast.add({ 
                    severity: 'error',
                    summary: 'Failed', detail: 'Could not copy Room ID to clipboard',
                    life: 2000 
                })
            })
        },
        onStart() {
            this.state.room.status = Status.PLAYING
            socket.emit('startGame')
        }
    }
});
</script>

<style scoped lang="scss">
    .game-sidebar {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 10px 10px 10px 10px;

        color: white;
        background-color: #363636;

        box-shadow: -3px 0px 8px #303030cb;
    }

    .sidebar-start {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .header {
            width: 100%;

            display: inline-flex;
            justify-content: space-between;
            align-items: flex-start;

            font-family: dosis;
            .game-status {
                height: 100%;

                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;

                flex: 1;

                .game-name {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    h1 {
                        padding-bottom: 5px;
                        margin: 0;
                    }
                }
                h2 {
                    display: inline-flex;
                }
                .username {
                    display: inline-block;
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;

                    text-overflow: ellipsis;
                }
            }
            .room-id {
                height: 100%;

                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                padding: 5px 5px 5px 5px;

                border: 1px solid #4a4a4a;
                border-radius: 15px;

                cursor: pointer;

                &:hover {
                    backdrop-filter: invert(10%);
                }
            }
        }
    }

    .player-information-container {

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        
        font-family: dosis;

        .player-information {
            display: inline-flex;
            gap: 10px;

            .player {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .sidebar-tab-view {
        width: 100%;
        height: 100%;
        min-height: 0;
        
        display: flex;
        flex-direction: column;

        .game-information {
            height: 100%;

            
            .game-start {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                font-family: dosis;
            }
        }
        .chat {
            height: 100%;
        }
    }

    ::v-deep(.p-tabview-nav-container) {
        flex: 0;
    }
    ::v-deep(.p-tabview-panels) {
        width: 100%;
        min-height: 0;

        padding: 5px;

        flex: 1;
    }
    ::v-deep(.p-tabview-panel) {
        width: 100%;
        height: 100%;
    }
    ::v-deep(.p-tabview-header) {
        width: 100%;
        
        span {
            text-align: center;
            width: 100%;
        }
    }

    mark {
        all: unset;

        font-family: dosis;
        color: #dedede;
    }
</style>