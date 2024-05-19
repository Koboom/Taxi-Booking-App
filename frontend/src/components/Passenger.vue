<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

    export default {
        name: "Passenger",
        data() {
            return {
                passenger: {},
                drivers: [],
                bookings: [],
                destination:"",
                text: "No bookings yet"
            }
        },
        async mounted() {
            await this.updatePassenger()
            this.drivers = await this.fetchDrivers()
        },
        methods: {
            ...mapActions(useCounterStore, ["fetchPassenger","fetchDrivers","bookDriver","fetchBookings"]),
            async bookDriverAndUpdatePassenger( { driverId, passengerId, origin, destination }) {
                await this.bookDriver( { driverId, passengerId, origin, destination })
                this.destination =""
                this.updatePassenger()
                alert("Driver Booked")
                this.text = ""
            },
            async updatePassenger() {
                this.passenger = await this.fetchPassenger(this.$route.params.passengerId)
            }
        }
    }
</script>

<template>
    <div class="w3-container">
        <h2>Passenger Details</h2>
        Welcome {{ passenger.name }} {{ passenger.surname }}! You are in {{ passenger.location }}! <br>

        Would you like to book a Driver?
        <hr>
        <h4>Bookings History</h4>
        <p>{{ text }}</p>
            <ol>
                <li v-for="booking in passenger.bookings">
                    {{ passenger.name }} {{ passenger.surname }} : {{ booking.origin }} to {{ booking.destination }} with <span class="w3-tag w3-green">{{ booking.driver.name }}</span>
                </li>
            </ol>

        <hr>
        <h3>Create new booking</h3>
        <p>
            Destination: <input type="text" v-model="destination" placeholder="add destination..." class="w3-input w3-border w3-round-large">
        </p>
        <hr>
        <ul v-for="driver in drivers">
            <li>
                {{ driver.name }} {{ driver.surname }}, {{ driver.location }}
                <button @click="bookDriverAndUpdatePassenger({driverId: driver._id, passengerId: passenger._id, origin:passenger.location, destination:destination})"
                 class="w3-button w3-green">
                    Book
                </button>
            </li>
        </ul>
    </div>
</template>