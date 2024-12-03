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
      <h2>Kundendetails</h2>
      Willkommen {{ passenger.name }} {{ passenger.surname }}! Sie befinden sich in {{ passenger.location }}! <br>

      Möchten Sie einen Fahrer buchen?
      <hr>
      <h4>Buchungsverlauf</h4>
      <p>{{ text }}</p>
      <ol>
        <li v-for="booking in passenger.bookings" :key="booking.id">
          {{ passenger.name }} {{ passenger.surname }} : {{ booking.origin }} to {{ booking.destination }} with <span class="w3-tag w3-green">{{ booking.driver.name }}</span>
        </li>
      </ol>

      <hr>
      <h3>Neue Buchung erstellen</h3>
      <p>
        Ziel:
        <input
          type="text"
          v-model="destination"
          placeholder="Ziel hinzufügen..."
          class="w3-input w3-border w3-round-large"
          required
          name="destination">
      </p>
      <div v-if="error" class="error">{{ error }}</div>
      <hr>
      <ul>
        <li v-for="driver in drivers" :key="driver._id">
          {{ driver.name }} {{ driver.surname }}, {{ driver.location }}
          <button
            @click="bookDriverAndUpdatePassenger({
              driverId: driver._id,
              passengerId: passenger._id,
              origin: passenger.location,
              destination: destination
            })"
            class="w3-button w3-green">
            Book
          </button>
        </li>
      </ul>
    </div>
  </template>

  <script>
  import { useCounterStore } from '@/stores/state';
  import { mapActions } from 'pinia';

  export default {
    name: "Passenger",
    data() {
      return {
        passenger: {},
        drivers: [],
        bookings: [],
        destination: "",
        text: "Noch keine Buchungen",
        error: ""
      };
    },
    async mounted() {
      await this.updatePassenger();
      this.drivers = await this.fetchDrivers();
    },
    methods: {
      ...mapActions(useCounterStore, ["fetchPassenger", "fetchDrivers", "bookDriver", "fetchBookings"]),
      async bookDriverAndUpdatePassenger({ driverId, passengerId, origin, destination }) {
        if (!destination) {
          this.error = 'Please add a destination.';
          return;
        }
        this.error = '';
        await this.bookDriver({ driverId, passengerId, origin, destination });
        this.destination = "";
        this.updatePassenger();
        alert("Driver Booked");
        this.text = "";
      },
      async updatePassenger() {
        this.passenger = await this.fetchPassenger(this.$route.params.passengerId);
      }
    }
  };
  </script>

  <style>
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
