<template>
    <div>
        <p-avatar :image="'https://api.multiavatar.com/' + state.session.user.avatarID + '.svg'"
                    size="large"
                    style="cursor: pointer;"
                    @click="toggleOverlayPanel"
        />
        <p-overlay-panel ref="overlayPanel">
            <div class="profile-popover">
                <div class="user-info">
                    <p-avatar :image="'https://api.multiavatar.com/' + state.session.user.avatarID + '.svg'"
                              size="xlarge"
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
                              v-tooltip.left="'Settings'"
                              @click="onOpenSettings"
                    />
                    <p-button label="Logout"
                              severity="danger"
                              size="small"
                              v-tooltip.left="'Logout'"
                              @click="disconnectSocket"
                    />
                </div>
                
            </div>
        </p-overlay-panel>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProfilePopover',
    methods: {
        toggleOverlayPanel(event: Event) {
            (this.$refs.overlayPanel as any).toggle(event)
        },
        onOpenSettings() {
            console.log('lol')
        }
    }
})
</script>
<script setup lang="ts">
import { disconnect } from "@/socket";
import { state } from "@/socket";
const { disconnectSocket } = disconnect()
</script>

<style lang="scss">
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
            display: inline-flex;
            align-items: center;
            gap: 5px;

            #coin-icon {
                font-size: 1.8rem;
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