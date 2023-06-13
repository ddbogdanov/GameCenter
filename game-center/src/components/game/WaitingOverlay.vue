<template>
    <div class="waiting-overlay">
        <div class="overlay-content">
            
            <div class="waiting-text">
                <span v-for="(letter, index) in waitingText" 
                    :key="index"
                    :style="`--i:${index}`" 
                    :class="letter == ' ' ? 'space' : 'letter'"
                >
                    {{ letter }}
                </span>
            </div>
            <Transition name="waiting">
                <p-button severity="success"
                        icon="pi pi-play"
                        iconPos="right"
                        label="Start"
                        style="width: 100%;"
                        v-if="showStartButton"
                        @click="onStart"
                />
            </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WaitingOverlay',
    props: {
        waitingText: {
            type: String,
            required: true
        },
        showStartButton: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onStart() {
            this.$emit('start')
        }
    }
});
</script>

<style scoped lang="scss">
 .waiting-overlay {
        position: absolute;
        z-index: 1001;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        backdrop-filter: blur(10px);

        display: flex;
        justify-content: center;
        align-items: center;

        .overlay-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }

    .waiting-text {
        position: relative;

        font-family: dosis;
        font-size: 4rem;
        font-weight: 600;
        color: var(--primary-color);
        -webkit-text-stroke: 1px black;

        .space {
            width: 15px;
        }
        span {
            position: relative;
            display: inline-block;
            animation: flip 4s infinite;
            animation-delay: calc(100ms * var(--i))
        }
        ul {
            padding: 0;
        }
    }
    @keyframes flip {
        0%,70% {
            transform: rotateY(360deg) 
        }
    }

    .waiting-move, 
    .waiting-enter-active,
    .waiting-leave-active {
        transition: all 0.5s ease;
    }

    .waiting-enter-from,
    .waiting-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }

    .waiting-leave-active {
        position: absolute;
    }
</style>
