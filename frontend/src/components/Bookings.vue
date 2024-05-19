<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

    export default {
        name: "Passenger",
        data() {
            return {
                passenger: {},
                drivers: [],
                bookings: []
            }
        },
        async mounted() {
            await this.updatePassenger()
            this.drivers = await this.fetchDrivers()

        },
        methods: {
            ...mapActions(useCounterStore, ["fetchPassenger","fetchDrivers","bookDriver","fetchBookings"]),
            async updatePassenger() {
                this.passenger = await this.fetchPassenger(this.$route.params.passengerId)
            }
        }
    }
</script>
<template>
    <div class="w3-container">
        <h3>Bookings Detail</h3>
        {{ passenger.name }}
    </div>
</template>
