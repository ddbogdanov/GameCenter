<template>
 <div class="debug-footer">
    <div class="client-info">
        <p>Connected: <mark>{{ connected }}</mark></p>
        <div v-if="connected">
            <p>Username: <mark>{{ session.user.username }}</mark></p>
            <p>UserID: <mark>{{ session.user.userID }}</mark></p>
            <p>SessionID: <mark>{{ session.sessionID }}</mark></p>
            <p>Coins: <mark>{{ session.user.coins }}</mark></p>
        </div>
    </div>
    <div class="active-users">
        <i class="pi pi-user"></i>
        <p><mark>{{ activeUsers }}</mark></p>
    </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from "@/socket";

export default defineComponent({
    name: "DebugFooter",
    computed: {
        connected() {
            return state.connected;
        },
        session() {
            return state.session;
        },
        activeUsers() {
            return state.activeUsers;
        }
    },
})
</script>
<script lang="ts" setup>

</script>

<style scoped lang="scss">
    p {
        all: unset;
        margin-left: 5px;
        margin-right: 5px;
    }
    mark {
        all: unset;
        color: rgb(86, 86, 86)
    }
    .debug-footer {
        height: 20px;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        background-color: transparent;
        color: black;
    }
    .client-info {
        display: inline-flex;
    }
    .active-users {
        display: inline-flex;
    }
</style>