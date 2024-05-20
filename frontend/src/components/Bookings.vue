<script>
    import { useCounterStore } from '@/stores/counter';
    import { mapActions } from 'pinia';

    export default {
        name: "Bookings",
        data() {
            return {
                bookings: []
            }
        },
        async mounted() {
            await this.updateBookings();
        },
        methods: {
            ...mapActions(useCounterStore, ["fetchBookings"]),
            async updateBookings() {
                await this.fetchBookings();
            }
        }
    }
</script>

<template>
    <div class="w3-container">
        <h2>Bookings Page</h2>
        <p>{{ bookings.length }}</p>
    </div>
</template>