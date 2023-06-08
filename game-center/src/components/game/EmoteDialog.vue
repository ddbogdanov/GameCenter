<template>
    <img src='@/assets/heheheha.gif'>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "EmoteDialog",
    inject: ['dialogRef'],
    created() {
        this.audio = new Audio(this.sound)
        this.audio.play()
    },
    data() {
        return {
            sound: require('@/assets/heheheha.mp3'),
            audio: undefined as any
        }
    }
});
</script>

<style scoped lang="scss">

</style>