<template>
    <div class="profile-settings">
        <div class="settings-header">
            <PlayerAvatar size="xlarge"
                          shape="circle"
                          :avatar-id="state.session.user.avatarID"
                          :background-color="state.session.user.avatarBackgroundColor"
            />
            <h1>{{ state.session.user.username }}</h1>
            <p-button icon="pi pi-sign-out"
                      severity="danger"
                      outlined
                      @click="disconnectSocket"
                      style="margin-left: auto;"
                      v-tooltip.left="'Logout'"
            />
        </div>

        <p-divider/>

        <div class="settings-content">
            <form @submit.prevent="onSubmit()" class="profile-form" id="profile-form">
                <p-fieldset legend="Avatar" 
                            :toggleable="true"
                            v-tooltip.left="'Change Avatar ID to get a different avatar.'"
                >
                
                        <div class="form-item top-label">
                            <label for="avatarID">Avatar ID</label>
                            <p-input-text id="avatarID"
                                        v-model="state.session.user.avatarID"
                                        style="width: 100%;"
                            />
                        </div>

                        <div class="form-item inline-label">
                            <label for="avatarBackgroundColor">Background Color</label>
                            <p-color-picker id="avatarBackgroundColor"
                                            v-model="state.session.user.avatarBackgroundColor"
                                            format="hex"
                            />
                        </div>
                    
                </p-fieldset>
                <p-fieldset legend="Coins" 
                            :toggleable="true" 
                            v-tooltip.left="'You can give yourself 10 coins, if your balance is below 10 coins. :)'"
                >
                    <div class="current-balance">
                        <p>Current balance</p>
                        <div class="coins">
                            <i class="pi pi-bitcoin"/>
                            <strong>{{ state.session.user.coins }}</strong>
                        </div>
                    </div>
                    <p-button severity="primary"
                              label="Add 10 Coins"
                              outlined
                              :disabled="state.session.user.coins >= 10"
                              @click="onAddCoins"
                    />
                </p-fieldset>
            </form>
        </div>

        <p-divider/>

        <div class="settings-footer">
            <p-button severity="danger"
                      outlined
                      label="Cancel"
                      style="width: 100%;"
                      @click="onCancel"
            />
            <p-button severity="primary"
                      label="Save"
                      style="width: 100%;"
                      type="submit"
                      form="profile-form"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { state, socket, disconnect } from "@/socket"
import PlayerAvatar from '../PlayerAvatar.vue';

export default defineComponent({
    name: "ProfileSettings",
    components: { 
        PlayerAvatar 
    },
    methods: {
        onSubmit() {
            socket.emit("updateUser", {
                sessionID: state.session.sessionID,
                userID: state.session.user.userID,
                avatarID: state.session.user.avatarID,
                avatarBackgroundColor: state.session.user.avatarBackgroundColor,
                coins: state.session.user.coins
            });
            this.$emit("submit");
        },
        onCancel() {
            this.$emit("cancel");
        },
        onAddCoins() {
            state.session.user.coins = parseFloat((state.session.user.coins + 10).toFixed(4))
        }
    },
})
</script>
<script setup lang="ts">
const { disconnectSocket } = disconnect()
</script>

<style scoped lang="scss">
    .profile-settings {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .settings-header {
        width: 100%;

        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        font-family: dosis;
    }
    .settings-content {
        width: 100%;
        height: 100%;

        padding: 0 0 0 0;

        h1 {
            margin: 0;
        }
    }
    .settings-footer {
        width: 100%;

        display: inline-flex;
        gap: 10px;
    }

    .profile-form {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
    }
    .form-item {
        &.top-label {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        &.inline-label {
            width: 100%;
            
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    ::v-deep(.p-fieldset-content) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
    }

    .current-balance {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        .coins {
            i {
                padding-right: 5px;
                color: gold;
            }
        }
    }
</style>