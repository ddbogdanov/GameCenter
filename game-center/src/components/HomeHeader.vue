<template>
    <div class="home-header">
        <h1>Games</h1>
        <p-button label="All Rooms"
                  severity="primary"
                  outlined
                  icon="pi pi-chevron-right" 
                  iconPos="right"
                  @click="onViewAllRooms"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeHeader',
  methods: {
    onViewAllRooms() {
        this.$router.push('/lobby')
    }
  }
});
</script>

<style scoped lang="scss">
    h1 {
        margin: 0;
    }
    .home-header {
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