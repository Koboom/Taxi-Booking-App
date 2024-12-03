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

        <h2>Neue Kunde</h2>
        <div class="">
            <p>
                <label for="name">Name:</label>
                <input class="w3-input" type="text" id="name" v-model="name" placeholder="Name eingeben..." required>
            </p>
            <p>
                <label for="surname">Surname:</label>
                <input class="w3-input" type="text" id="surname" v-model="surname" placeholder="Nachname eingeben..." required>
            </p>
            <p>
                <label for="location">Location:</label>
                <input class="w3-input" type="text" id="location" v-model="location" placeholder="Ort eingeben..." required>
            </p>
            <div v-if="error" class="error">{{ error }}</div>
            <button @click="addNewPassenger">Neue Kunde Hinzufügen</button>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/state';
import { mapActions } from 'pinia';

export default {
    name: "Passengers",
    data() {
        return {
            passengers: [],
            name: "",
            surname: "",
            location: "",
            allBookings: [],
            error: ""
        }
    },
    async mounted() {
        await this.updatePassengers();
    },
    computed: {
        totalBookings() {
            // Tüm yolcuların rezervasyon sayısını topla
            return this.passengers.reduce((total, passenger) => total + passenger.bookings.length, 0);
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchPassengers", "addPassenger", "deletePassenger"]),
        async updatePassengers() {
            this.passengers = await this.fetchPassengers();
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), []);
        },
        async deleteFecthPassengers(passengerId) {
            await this.deletePassenger(passengerId);
            await this.updatePassengers();
        },
        async addNewPassenger() {
            if (!this.name || !this.surname || !this.location) {
                this.error = 'Bitte füllen Sie alle Felder aus.';
                return;
            }
            this.error = '';
            await this.addPassenger({
                name: this.name,
                surname: this.surname,
                location: this.location
            });
            this.name = "";
            this.surname = "";
            this.location = "";
            await this.updatePassengers();
        }
    }
}
</script>

<style>
.error {
    color: red;
    font-weight: bold;
}
</style>
