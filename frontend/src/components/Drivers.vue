<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

    export default {
        name: "Drivers",
        data() {
            return {
                drivers: [],
                passengers:[],
                name: "",
                surname:"",
                age:"",
                location:"",
                allBookings: []
            }
        },
        async mounted() {
            await this.updateDrivers();
            await this.updatePassengers();
        },
        computed: {
            totalBookings() {
                // Tüm yolcuların rezervasyon sayısını topla
                return this.passengers.reduce((total, passenger) => total + passenger.bookings.length, 0);
            }
        },
        methods: {
            ...mapActions(useCounterStore, ["fetchDrivers","fetchPassengers","addDriver"]),
            async updateDrivers() {
                this.drivers = await this.fetchDrivers()
            },
            async updatePassengers() {
                this.passengers = await this.fetchPassengers()
                this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), [] )
            },
            async addNewDriver() {
                await this.addDriver({
                    name: this.name,
                    surname: this.surname,
                    age: this.age,
                    location: this.location
                })
                this.name ="",
                this.surname = "",
                this.age = "",
                this.location = ""

                await this.updateDrivers()
            }
        }
    }
</script>

<template>
    <div class="w3-container">
        <p>Total number of bookings: {{ totalBookings }}</p>

        <h2>Drivers Page</h2>


        <p>There are {{ drivers.length }} drivers.</p>
        <ol>
            <li v-for="driver in drivers">
                <a :href="`/drivers/${driver._id}`">{{ driver.name }} {{ driver.surname }}</a>
            </li>
        </ol>
    </div>
    <h2>New Driver</h2>
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
            <label for="age">Age:</label>
            <input class="w3-input" type="number" id="age" v-model="age" placeholder="Enter age...">
        </p>
        <p>
            <label for="location">Location:</label>
            <input class="w3-input" type="text" id="location" v-model="location" placeholder="Enter location...">
        </p>
        <button @click="addNewDriver">Add Driver</button>
    </div>
</template>