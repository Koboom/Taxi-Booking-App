<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

    export default {
        name: "Drivers",
        data() {
            return {
                drivers: []
            }
        },
        async mounted() {
            this.drivers = await this.fetchDrivers()
        },
        methods: {
            ...mapActions(useCounterStore, ["fetchDrivers"])
        }
    }
</script>

<template>
    <div class="w3-container">
        <h2>Drivers Page</h2>
        <ol>
            <li v-for="driver in drivers">
                <a :href="`/drivers/${driver._id}`">{{ driver.name }} {{ driver.surname }}</a>
            </li>
        </ol>
    </div>
</template>