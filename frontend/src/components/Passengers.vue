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
        ...mapActions(useCounterStore, ["fetchPassengers", "addPassenger", "deletePassenger"]),
    async updatePassengers() {
        try {
            this.passengers = await this.fetchPassengers();
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), []);
        } catch (error) {
            console.error("Passagiere konnten nicht aktualisiert werden:", error);
            alert('Passagiere konnten nicht aktualisiert werden. Bitte versuchen Sie es später noch einmal.');
        }
    },
    async deleteFecthPassengers(passengerId) {
        await this.deletePassenger(passengerId);
        await this.updatePassengers();
    },
    async addNewPassenger() {
        if (!this.name || !this.surname || !this.location) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
        try {
            await this.addPassenger({
                name: this.name,
                surname: this.surname,
                location: this.location
            });
            this.name = "";
            this.surname = "";
            this.location = "";
            await this.updatePassengers();
        } catch (error) {
            console.error("Passagiere konnten nicht aktualisiert werden:", error);
            alert('Passagiere konnten nicht aktualisiert werden. Bitte versuchen Sie es später noch einmal.');
        }
        }
    }
}
</script>

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

        <div class="w3-container w3-half w3-border w3-border-green w3-round-large w3-pale-green w3-round">
            <h2>Kunden Seite</h2>
            <p>Es gibt {{ passengers.length }} Kunden</p>
            <ol class="w3-ul">
                <li class="" v-for="passenger in passengers" :key="passenger._id">
                    <a class="w3-button" :href="`/passengers/${passenger._id}`">{{ passenger.name }} {{ passenger.surname }} </a>
                    <button @click="deleteFecthPassengers(passenger._id)">Delete</button>
                </li>
            </ol>
        </div>
        <div class="w3-container w3-half w3-border w3-border-green w3-round-large w3-pale-green w3-round">
            <h2>Neue Kunde</h2>
            <p>
                <label for="name"></label>
                <input class="w3-input" type="text" id="name" v-model="name" placeholder="Name eingeben..." required>
            </p>
            <p>
                <label for="surname"></label>
                <input class="w3-input" type="text" id="surname" v-model="surname" placeholder="Nachname eingeben..." required>
            </p>
            <p>
                <label for="location"></label>
                <input class="w3-input" type="text" id="location" v-model="location" placeholder="Ort eingeben..." required>
            </p>
            <button @click="addNewPassenger" class="w3-button w3-green w3-round-large">Neue Kunde Hinzufügen</button>
        </div>
    </div>

</template>

<style></style>
