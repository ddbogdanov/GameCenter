<template>
    <div style="height: 100%;">
        <NavBar/>

        <div class="crash-coin">
            <h1>Next Game In: {{ nextGameIn }}</h1>
            <h1>Multiplier: {{ multiplier }}x</h1>

            <p-chart type="line"
                    :data="multiplierHistory"
                    :options="chartOptions"
                    ref="chart"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { socket, state } from '@/socket'
import NavBar from '@/components/navbar/NavBar.vue';

export default defineComponent({
    name: 'CrashCoinView',
    components: {
        NavBar
    },
    setup() {
        const chart = ref()

        const updateChart = (data: any) => {
            const c = chart.value.chart
            c.data.labels.push(data.time)
            c.data.datasets[0].data.push(data.multiplier)
            
            c.update()
        }
        const resetChart = () => {
            const c = chart.value.chart

            c.data.labels = []
            c.data.datasets[0].data = []
        }

        return {
            chart,
            updateChart,
            resetChart,
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            display: false
                        },
                        min: 0,
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            display: false
                        },
                        min: 1
                    }
                },
                animations: {
                    x: {
                        
                    },
                    y: {

                    }
                }
            },
            multiplierHistory: {
                labels: [] as string[],
                datasets: [
                    {
                        label: '',
                        data: [] as number[],
                        fill: false,
                        pointRadius: 0,
                    }
                ]
            },
        }
    },
    data() {
        return {
            multiplier: 1.00,
            crashHistory: [] as Array<any>,
            nextGameIn: 0,
        }
    },
    created() {
        socket.on('multiplierUpdate', (data) => {
            this.multiplier = data.multiplier
            this.updateChart(data)
        })
        socket.on('gameEnd', (data) => {
            this.crashHistory.push(data)
            this.resetChart()
        })
        socket.on('nextGameIn', (data) => {
            this.nextGameIn = data
        })
    },
    methods: {
      
    }
})
</script>

<style lang="scss">
.crash-coin {
    width: 100%;
    height: calc(100% - 60px);
}
</style>