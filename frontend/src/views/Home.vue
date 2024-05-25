<template>
    <div class="w3-container">
        <h3>All Bookings</h3>
        <p>Total number of bookings: {{ totalBookings }}</p>
        <ul>
            <li v-for="booking in allBookings" :key="booking._id">
                <!-- Her bir rezervasyonu göster -->
                <p class="w3-border w3-padding ">
                    {{ booking.passenger.name }} {{ booking.passenger.surname }} -
                    <span class="">{{ booking.passenger.location  }}-{{ booking.destination }} with {{ booking.driver.name }}</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

export default {
    name: "Passengers",
    data() {
        return {
            passengers: [],
            name: "",
            surname: "",
            location: "",
            allBookings: []
        }
    },
    async mounted() {
        await this.updatePassengers()
    },
    computed: {
        totalBookings() {
            // Tüm yolcuların rezervasyon sayısını topla
            return this.passengers.reduce((total, passenger) => total + passenger.bookings.length, 0);
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchPassengers","addPassenger"]),
        async updatePassengers() {
            this.passengers = await this.fetchPassengers()
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), [] )
        },
        async addNewPassenger() {
            await this.addPassenger({
                name: this.name,
                surname: this.surname,
                location: this.location
            })
            this.name=""
            this.surname=""
            this.location=""
            await this.updatePassengers()
        }
    }
}
</script>

<style></style>
