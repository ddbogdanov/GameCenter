<template>
    <div class="chat">

        <p-scroll-panel class="chat-container">
            <span v-for="(message, index) in messages" 
                    :key="index"
                    :class="index % 2 == 1 ? 'message odd' : 'message' "
            >
                <PlayerAvatar size="normal"
                                shape="circle"
                                :avatar-id="message.user.avatarID"
                                :background-color="message.user.avatarBackgroundColor"
                                class="message-avatar"
                />
                <div class="message-content">
                    <p>{{ message.message }}</p>
                </div>
                <div class="message-timestamp">
                    <p>{{ message.timestamp.toLocaleTimeString() }}</p>
                    <strong class="username">{{ message.user.username }}</strong>
                </div>
            </span>
        </p-scroll-panel>
 
        <div class="chat-footer">
            <span class="p-inputgroup" style="width: 100%">
                <p-input-text v-model="message.message"
                              placeholder="Message"
                              style="width: 100%"
                              @keyup.enter="onSend"
                />
                <!-- <span class="p-inputgroup-addon">
                    <i class="pi pi-thumbs-up" @click="emote"></i>
                </span> -->
                <span class="p-inputgroup-addon">
                    <i class="pi pi-send" @click="onSend"></i>
                </span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import Message from '@/model/Message'
import PlayerAvatar from '@/components/PlayerAvatar.vue';
import EmoteDialog from '@/components/game/EmoteDialog.vue'
// TODO: timestamps display right time only on recieved message, but even that isnt right.
// timestamp should display time the message was sent. 
export default defineComponent({
    name: "UserChat",
    components: {
        PlayerAvatar,
    },
    props: {
        roomID: {
            type: String,
            required: false,
        }
    },
    data() {
        return {
            message: {
                user: state.session.user,
                message: "",
                timestamp: new Date()
            } as Message,
            messages: [] as Array<Message>
        };
    },
    mounted() {
        socket.on("recieveGameMessage", (message: Message) => {
            message.timestamp = new Date(message.timestamp);
            this.messages.push(message);
        });
        socket.on('recieveEmote', () => {
            this.$dialog.open(EmoteDialog, {})
        })
    },
    methods: {
        onSend() {
            if(!this.message.message) {
                // TODO: user feedback
                return
            }

            this.messages.push({
                user: this.message.user,
                message: this.message.message,
                timestamp: this.message.timestamp
            } as Message);
            socket.emit("sendMessage", { message: this.message, roomID: this.roomID });
            this.message.message = "";
        },
        // emote() {
        //     socket.emit('sendEmote', { roomID: state.room.roomID }) 
        // }
    },
});
</script>

<style scoped lang="scss">
    .chat {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .chat-container {
            flex: 1;
            width: 100%;
           
            min-height: 0;
        }
        .chat-footer {
            width: 100%;

            i {
                cursor: pointer;
                transition: transform .2s ease;
            }
            i:hover {
                transform: scale(1.2);
            }
        }
    }

    .message {
        width: 100%;

        padding: 5px 5px 5px 5px;

        display: inline-flex;
        justify-content: space-between;

        color: white;
        .message-avatar {
                min-width: fit-content;
        }
        .message-content {
            flex: 1;
            max-width: calc(100% - 80px - 30px); // 80px for timestamp, 30px for avatar.
            padding-left: 4px;
            
            display: inline-flex;
            gap: 10px;

            overflow-wrap: break-word;

            p { 
                max-width: 100%;
                overflow-wrap: break-word;
            }
        }
        .message-timestamp {
            min-width: 80px;
            max-width: 80px;

            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .username {
                max-width: 80px;
                overflow: hidden;
                white-space: nowrap;

                text-overflow: ellipsis;
            }
        }

        p {
            margin: 0;
        }
    }
    .odd {
        background-color: #3d3d3d
    }
</style>