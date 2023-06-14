<template>
    <p-table :value="leaderboard"
             class="p-datatable-sm"
             striped-rows
             scrollable
             scrollHeight="flex"
             sortField="profit"
             :sortOrder="-1"
    >
    <template #empty> 
        <h1 style="font-family: dosis">No leaders.</h1>
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
</template>

<script lang="ts">
import CrashCoinBet from '@/model/CrashCoinBet';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'LeaderboardTable',
    props: {
        leaderboard: {
            type: Array as PropType<Array<CrashCoinBet>>,
            required: true
        },
    },
})
</script>

<style scoped lang="scss">

</style>