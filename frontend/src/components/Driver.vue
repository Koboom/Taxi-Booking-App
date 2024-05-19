<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

    export default {
        name: "Driver",
        data() {
            return {
                driver: {}
            }
        },
        async mounted() {
            this.driver = await this.fetchDriver(this.$route.params.driverId)
        },
        methods: {
            ...mapActions(useCounterStore, ["fetchDriver"])
        }
    }
</script>

<template>
    <div class="w3-container">
        <h2>Driver Details</h2>
        {{ driver.name }} {{ driver.surname }}, {{ driver.location }}, {{ driver.age }}
        <hr>
    </div>
</template>