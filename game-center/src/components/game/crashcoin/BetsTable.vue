<template>
    <p-table :value="bets"
             scrollable
             scrollHeight="flex"
    >
        <p-column field="user.username"
                  header="Username"
        />
        <p-column field="wager"
                  header="Wager"
        />
        <p-column field="cashedOutAt"
                  header="@"
        />
        <p-column field="profit"
                  header="Profit"
        />
    </p-table>
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
})
</script>

<style lang="scss">

</style>