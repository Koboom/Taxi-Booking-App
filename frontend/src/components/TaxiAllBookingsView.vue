<template>
    <div class="w3-container">
        <p class="w3-panel w3-leftbar w3-border-green w3-pale-red w3-round-large">
            Es handelt sich um eine Demoseite. Sie können Ihren Namen hinzufügen, auf Ihren Namen klicken und
            einen Fahrer engagieren, der Sie zum gewünschten Punkt bringt. Sie können Ihren Namen löschen, wenn Sie möchten.
        </p>
        <hr>
        <div>
            <router-link class="w3-button w3-green w3-round-large" to="/taxiBookingsHauptSeite">Home</router-link>
        </div>

        <p class="w3-panel w3-leftbar w3-padding-large w3-border-green w3-round w3-pale-red w3-round-large">Anzahl der Bestellungen: {{ totalBookings }}</p>
        <div class="w3-container">
        <h3>All Bookings</h3>
        <ul>
            <li v-for="booking in allBookings" :key="booking._id">

                <p class="w3-border w3-border-green w3-padding w3-margin-top w3-margin-bottom">
                    {{ booking.passenger.name }} {{ booking.passenger.surname }} -
                    <span class="">{{ booking.passenger.location  }}-{{ booking.destination }} with {{ booking.driver.name }}</span>
                    <button @click="deleteBooking(booking._id)" class="w3-button w3-green w3-right">Delete</button>
                </p>
            </li>
        </ul>
    </div>
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
        ...mapActions(useCounterStore, ["fetchPassengers","addPassenger","deletePassenger"]),
        async updatePassengers() {
            this.passengers = await this.fetchPassengers()
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), [] )
        },
        async deleteFecthPassengers(passengerId) {
            await this.deletePassenger(passengerId)
            await this.updatePassengers()
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
