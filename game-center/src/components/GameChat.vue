<template>
    <div class="chat">
        <div class="message-container">

        </div>
        <div class="chat-footer">
            <span class="p-input-icon-right" style="width: 100%">
                <p-input-text v-model="message"
                              placeholder="Message"
                              style="width: 100%"
                />
                <i class="pi pi-send" @click="onSend"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket, state } from '@/socket'


export default defineComponent({
    name: 'GameChat',
    data() {
        return {
            message: ''
        }
    },
    methods: {
        onSend() {
            console.log(this.message)

            /*
            
                pass messages prop into this component. parent component can handle recieving messages
                this works for local in game chats,
                for global chats, maybe same thing would work as well.

            */
        }
    },
});
</script>

<style lang="scss">
    .chat {
        width: 100%;   
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .message-container {
            width: 100%;

            flex: 1;
        }
        .chat-footer {
            width: 100%;

            i {
                cursor: pointer;
            }
        }
    }
</style>