<template>
    <div class="lobby-header">
        <p-button label="Home"
                  severity="primary"
                  outlined
                  icon="pi pi-chevron-left" 
                  iconPos="left"
                  @click="onHome"
        />
        <h1>Lobby</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LobbyHeader',
  methods: {
    onHome() {
        this.$router.push('/landing')
    }
  }
});
</script>

<style scoped lang="scss">
    h1 {
        margin: 0;
    }
    .lobby-header {
        width: inherit;
        height: 60px;

        padding: 0px 10px 0px 10px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        position: fixed;
        z-index: 3;

        color: white;
        font-family: dosis;

        
        border-radius: 0px 0px 15px 15px;

        backdrop-filter: blur(10px);
        background-color: #363636de;
    }
</style>