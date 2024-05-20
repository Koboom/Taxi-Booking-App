<template>
    <div class="w3-container">
        <p>Total number of bookings: {{ totalBookings }}</p>
        <h2>Passengers Page</h2>
        <p>There are {{ passengers.length }} passengers.</p>
        <ol>
            <li v-for="passenger in passengers" :key="passenger._id">
                <a class="w3-button" :href="`/passengers/${passenger._id}`">{{ passenger.name }} {{ passenger.surname }}</a>
            </li>
        </ol>
    </div>
    <h2>New Passenger</h2>
    <div class="w3-container">
        <p>
            <label for="name">Name:</label>
            <input class="w3-input" type="text" id="name" v-model="name" placeholder="Enter name...">
        </p>
        <p>
            <label for="surname">Surname:</label>
            <input class="w3-input" type="text" id="surname" v-model="surname" placeholder="Enter surname...">
        </p>
        <p>
            <label for="location">Location:</label>
            <input class="w3-input" type="text" id="location" v-model="location" placeholder="Enter location...">
        </p>
        <button @click="addNewPassenger">Add Passenger</button>
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
