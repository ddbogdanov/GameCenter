<template>
 <div class="debug-footer">
    <div class="client-info">
        <p>Connected: <mark>{{ connected }}</mark></p>
        <div v-if="connected">
            <el-divider direction="vertical"/>
            <p>Username: <mark>{{ session.user.username }}</mark></p>
            <el-divider direction="vertical"/>
            <p>UserID: <mark>{{ session.user.userID }}</mark></p>
            <el-divider direction="vertical"/>
            <p>SessionID: <mark>{{ session.sessionID }}</mark></p>
        </div>
    </div>
    <div class="active-users">
        <el-icon :size="15"><User/></el-icon>
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
  import { User } from '@element-plus/icons-vue'
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