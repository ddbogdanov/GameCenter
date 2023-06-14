<template>
    <div class="bets-table-container">
        <div class="header">
            <div class="start">
                <h3>Bets</h3>
            </div>
            <div class="end">
                <i class="pi pi-info-circle info"
                    v-tooltip.left="'Bets placed will be shown here'"
                />
            </div>
        </div>

        <p-table :value="bets"
                class="p-datatable-sm bets-table"
                striped-rows
                :row-style="rowStyle"
                scrollable
                scrollHeight="flex"
                sortField="cashedOutAt"
                :sortOrder="1"
        >
            <template #empty> 
                    <h1 style="font-family: dosis">No bets placed.</h1>
            </template>

            <p-column field="user.username"
                    header="Username"
            />
            <p-column field="wager"
                    header="Wager"
            />
            <p-column field="cashedOutAt" header="@">
                <template #body="slotProps">
                    {{ slotProps.data.cashedOutAt }}x
                </template>
            </p-column>
            <p-column field="profit"
                    header="Profit"
            />
        </p-table>
    </div>
</template>

<script lang="ts">
import CrashCoinBet from '@/model/CrashCoinBet';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'BetsTable',
    props: {
        bets: {
            type: Array as PropType<Array<CrashCoinBet>>,
            required: true
        },
    },
    methods: {
        rowStyle(data: CrashCoinBet) {
            if(data.cashedOutAt) {
                return { backgroundColor: '#24A64F', color: 'white'}
            }
        }
    }
})
</script>

<style scoped lang="scss">
    .bets-table-container {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;

        .header {
            color: white;
            font-family: dosis;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            padding: 10px 10px 10px 10px;
            border-bottom: 1px solid #CACACA;

            .info {
                transition: all 500ms;
                color: #CACACA;

                &:hover {
                    transform: scale(1.2);
                }
            }

            h3 {
                margin: 0;
            }
        }

        .bets-table {
            padding: 10px 10px 10px 10px;
        }
    }
</style>