<template>
    <p-avatar :image="`${avatarUrl}backgroundColor=${backgroundColor}&seed=${avatarId}.svg`"
                :shape="shape"
                :size="size"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'PlayerAvatar',
    props: {
        size: {
            type: String as PropType<"xlarge" | "large" | "normal">,
            required: true
        },
        shape: {
            type: String as PropType<"square" | "circle">,
            required: true
        },
        avatarId: {
            type: String,
            required: true
        },
        backgroundColor: {
            type: String,
            required: false,
            default: '#000000'
        },
    },
    data() {
        return {
            avatarUrl: 'https://api.dicebear.com/6.x/adventurer/svg?'
        }
    },
})
</script>

<style scoped lang="scss">

</style>
