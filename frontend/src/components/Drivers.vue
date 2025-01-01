  <script>
  import { useCounterStore } from '@/stores/counter';
  import { mapActions } from 'pinia';

  export default {
    name: "Drivers",
    data() {
      return {
        drivers: [],
        passengers: [],
        name: "",
        surname: "",
        age: "",
        location: "",
        allBookings: [],
        error: ""
      };
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
      ...mapActions(useCounterStore, ["fetchDrivers", "fetchPassengers", "addDriver", "deleteDriver"]),
      async updateDrivers() {
        this.drivers = await this.fetchDrivers();
      },
      async updatePassengers() {
        this.passengers = await this.fetchPassengers();
        this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), []);
      },
      async deleteFetchDriver(driverId) {
        await this.deleteDriver(driverId);
        await this.updateDrivers();
      },
      async addNewDriver() {
        if (!this.name || !this.surname || !this.age || !this.location) {
          this.error = 'Please fill in all fields.';
          return;
        }
        this.error = '';
        await this.addDriver({
          name: this.name,
          surname: this.surname,
          age: this.age,
          location: this.location
        });
        this.name = "";
        this.surname = "";
        this.age = "";
        this.location = "";

        await this.updateDrivers();
      }
    }
  };
  </script>

<template>
  <div class="w3-container">
    <p class="w3-panel w3-leftbar w3-border-green w3-pale-red w3-round-large">
      Dies ist eine Demoseite. Sie können Ihren Namen hinzufügen und auf Ihren Namen klicken. Sie können Ihren Namen löschen, wenn Sie möchten.
    </p>
    <hr>
    <div>
      <router-link class="w3-button w3-green w3-round-large" to="/taxiBookingsHauptSeite">Home</router-link>
    </div>
    <p class="w3-panel w3-leftbar w3-padding-large w3-border-green w3-round w3-pale-red w3-round-large">
      Anzahl der Bestellungen: {{ totalBookings }}
    </p>
    <div class="w3-container w3-half">
      <h2>Drivers Page</h2>
    <p>There are {{ drivers.length }} drivers.</p>
    <ol class="w3-ul w3-border w3-border-green w3-round-large w3-pale-green w3-round">
      <li v-for="driver in drivers" :key="driver._id">
        <a class="w3-button" :href="`/drivers/${driver._id}`">{{ driver.name }} {{ driver.surname }}</a>
        <button @click="deleteFetchDriver(driver._id)"> Delete</button>
      </li>
    </ol>
    </div>
    <div class="w3-container w3-half w3-border w3-border-green w3-round-large w3-pale-green w3-round">
    <h2>Neue Fahrer</h2>
    <p>
      <label for="name"></label>
      <input class="w3-input" type="text" id="name" v-model="name" placeholder="Name eingeben..." required>
    </p>
    <p>
      <label for="surname"></label>
      <input class="w3-input" type="text" id="surname" v-model="surname" placeholder="Nachname eingeben..." required>
    </p>
    <p>
      <label for="age"></label>
      <input class="w3-input" type="number" id="age" v-model="age" placeholder="Enter age..." required>
    </p>
    <p>
      <label for="location"></label>
      <input class="w3-input" type="text" id="location" v-model="location" placeholder="Ort eingeben..." required>
    </p>
    <div v-if="error" class="error">{{ error }}</div>
    <button @click="addNewDriver">Fahrer Hinzufügen</button>
  </div>
  </div>
</template>

<style>
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
