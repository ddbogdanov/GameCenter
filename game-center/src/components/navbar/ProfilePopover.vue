<template>
    <div>
        <PlayerAvatar size="large"
                      shape="circle"
                      :avatar-id="state.session.user.avatarID"
                      :background-color="state.session.user.avatarBackgroundColor"
                      style="cursor: pointer"
                      @click="toggleOverlayPanel"
        />
        <p-overlay-panel ref="overlayPanel">
            <div class="profile-popover">
                <div class="user-info">
                    <PlayerAvatar size="xlarge"
                                  shape="circle"
                                  :avatar-id="state.session.user.avatarID"
                                  :background-color="state.session.user.avatarBackgroundColor"
                    />
                    <h1>{{ state.session.user.username }}</h1>
                </div>
                
                <p-divider/>

                <div class="profile-information">
                    <div class="coins">
                        <i class="pi pi-bitcoin" id="coin-icon"></i>
                        <h2>{{ state.session.user.coins }}</h2>
                    </div>
                </div>

                <p-divider/>

                <div class="profile-actions">
                    <p-button label="Settings"
                              severity="info"
                              outlined
                              size="small"
                              @click="toggleSettingsVisible"
                              style="width: 100%"
                    />
                    <p-button label="Logout"
                              severity="danger"
                              size="small"
                              @click="disconnectSocket"
                              style="width: 100%"
                    />
                </div>
            </div>
        </p-overlay-panel>
    </div>

    <p-sidebar v-model:visible="profileSettingsVisible" 
               position="right"
               :dismissable="false"
               style="width: 25rem;"
               :pt="{
                   header: { style: 'justify-content: space-between'}
               }"
    >
        <template #header>
            <strong>Profile Settings</strong>
        </template>

        <ProfileSettings @cancel="closeSettings"
                         @submit="closeSettings"
        />
    </p-sidebar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileSettings from "./ProfileSettings.vue"
import PlayerAvatar from "../PlayerAvatar.vue"

export default defineComponent({
    name: 'ProfilePopover',
    components: {
        ProfileSettings,
        PlayerAvatar
    },
    data() {
        return {
            profileSettingsVisible: false
        }
    },
    methods: {
        toggleOverlayPanel(event: Event) {
            (this.$refs.overlayPanel as any).toggle(event)
        },
        toggleSettingsVisible() {
            this.profileSettingsVisible = !this.profileSettingsVisible
        },
        closeSettings() {
            this.profileSettingsVisible = false
        }
    }
})
</script>
<script setup lang="ts">
import { disconnect, state } from "@/socket"
const { disconnectSocket } = disconnect()
</script>

<style scoped lang="scss">
    .profile-popover {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
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
    .profile-information {
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        .coins {
            width: 100%;
            
            display: inline-flex;
            justify-content: space-evenly;
            align-items: center;
            gap: 5px;

            #coin-icon {
                font-size: 3rem;
                color: gold;
            }
        }
    }
    .profile-actions {
        width: 100%;
        height: 35px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
    }
</style>