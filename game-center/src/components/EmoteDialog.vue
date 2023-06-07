<template>
    <img src="../assets/heheheha.gif">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "EmoteDialog",
    inject: ['dialogRef'],
    created() {
        let audio = new Audio('../assets/heheheha.mp3');
        audio.play();
    }
});
</script>

<style scoped lang="scss">

</style>