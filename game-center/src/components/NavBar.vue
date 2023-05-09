<template>
    <div class="nav-bar">
        <div class="start">
            <img src="@/assets/boardgamesicon_white.png" class="logo" @click="this.$router.push('landing')"/>
        </div>
        <div class="end">
            <el-popover placement="bottom-end"
                        width="250px"
                        trigger="click"
            >
                <template #reference>
                    <el-avatar :src="'https://api.multiavatar.com/' + state.session.user.avatarID + '.svg'"
                               style="cursor: pointer;"
                    />
                </template>
               <template #default>
                    <div class="user-info">
                        <el-avatar :src="'https://api.multiavatar.com/' + state.session.user.avatarID + '.svg'"
                                   style="cursor: pointer;"
                                   :size="80"
                        />
                        <h1>{{ state.session.user.username }}</h1>
                    </div>
                    <el-divider></el-divider>
                    <el-button type="danger" @click="disconnectSocket">Disconnect</el-button>
                    <el-button icon="setting" round plain></el-button>
               </template>
            </el-popover>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavBar',
    methods: {

    }
})
</script>
<script setup lang="ts">
import { disconnect } from "@/socket";
import { state } from "@/socket";
const { disconnectSocket } = disconnect()
</script>

<style scoped lang="scss">
    .nav-bar {
        position: relative;
        z-index: 10;

        width: 100%;
        height: 60px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        background-color: #363636;

        box-shadow: 0px 3px 8px #303030cb;
    }
    .nav-bar .start {
        padding-left: 10px;

        display: flex;
        align-items: center;
    }
    .nav-bar .end {
        padding-right: 10px;

        display: flex;
        align-items: center;
    }
    .logo {
        height: 45px;
        cursor: pointer;
    }

    .user-info {
        font-family: dosis;
    
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
</style>