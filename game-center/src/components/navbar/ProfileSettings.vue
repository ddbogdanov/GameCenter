<template>
    <div class="profile-settings">
        <div class="settings-header">
            <p-avatar :image="this.$avatarUrl + state.session.user.avatarID + '.svg'"
                      shape="circle"
                      size="xlarge"
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
                <span class="p-float-label">
                    <p-input-text id="avatarID"
                                  v-model="state.session.user.avatarID"
                                  style="width: 100%;"
                    />
                    <label for="avatarID">Avatar ID</label>
                </span>
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

export default defineComponent({
    name: 'ProfileSettings',
    methods: {
        onSubmit() {
            socket.emit('updateAvatarID', {
                sessionID: state.session.sessionID,
                userID: state.session.user.userID,
                avatarID: state.session.user.avatarID
            })
            this.$emit('submit')
        },
        onCancel() {
            this.$emit('cancel')
        }
    }
})
</script>
<script setup lang="ts">
import { state, socket, disconnect } from "@/socket"
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
    }
    .settings-content {
        width: 100%;
        height: 100%;

        padding: 10px 0 10px 0;
    }
    .settings-footer {
        width: 100%;

        display: inline-flex;
        gap: 10px;
    }

    .profile-form {
        width: 100%;
        height: 100%;
    }
</style>