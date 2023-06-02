<template>
    <div class="chat">

            <p-scroll-panel class="chat-container">
                <span v-for="(message, index) in messages" 
                      :key="index"
                      :class="index % 2 == 1 ? 'message odd' : 'message' "
                >
                    <p-avatar :image="`${this.$avatarUrl}backgroundColor=${message.user.avatarBackgroundColor}&seed=${message.user.avatarID}.svg`"
                                shape="circle"
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
            <span class="p-input-icon-right" style="width: 100%">
                <p-input-text v-model="message.message"
                              placeholder="Message"
                              style="width: 100%"
                              @keyup.enter="onSend"
                />
                <i class="pi pi-send" @click="onSend"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'
import Message from '@/model/Message'

export default defineComponent({
    name: 'UserChat',
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
                message: '',
                timestamp: new Date()
            } as Message,
            messages: [] as Array<Message>
        }
    },
    mounted() {
        socket.on('recieveGameMessage', (message: Message) => {
            message.timestamp = new Date(message.timestamp)
            this.messages.push(message)
        })
    },
    methods: {
        onSend() {
            this.messages.push({ 
                user: this.message.user, 
                message: this.message.message, 
                timestamp: this.message.timestamp 
            } as Message)
            socket.emit('sendMessage', { message: this.message, roomID: this.roomID })

            this.message.message = ''
        }
    },
});
</script>

<style lang="scss">
    .chat {
        width: 100%;   

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .chat-container {
            width: 100%;
            flex: 1;
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
        background-color: var(--primary-100)
    }
</style>