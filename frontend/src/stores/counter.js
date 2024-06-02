import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// console.log('API URL:', process.env.VUE_APP_API_URL);

// Ayarlamayı burada yapıyoruz
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  async function fetchPassengers() {
    try {
      const response = await axios.get('/passengers');
      return response.data;
    } catch (error) {
      console.error('Error fetching passengers:', error);
      throw error;
    }
  }

  async function fetchPassenger(passengerId) {
    try {
      const response = await axios.get(`/passengers/${passengerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching passenger ${passengerId}:`, error);
      throw error;
    }
  }

  async function deletePassenger(passengerId) {
    try {
      const response = await axios.delete(`/passengers/${passengerId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting passenger ${passengerId}:`, error);
      throw error;
    }
  }

  async function deleteDriver(driverId) {
    try {
      const response = await axios.delete(`/drivers/${driverId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting passenger ${driverId}:`, error);
      throw error;
    }
  }

  async function fetchDrivers() {
    try {
      const response = await axios.get('/drivers');
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  }

  async function fetchDriver(driverId) {
    try {
      const response = await axios.get(`/drivers/${driverId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching driver ${driverId}:`, error);
      throw error;
    }
  }

  async function fetchBookings() {
    try {
      const response = await axios.get('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async function bookDriver({ passengerId, driverId, origin, destination }) {
    try {
      const response = await axios.post(`/passengers/${passengerId}/bookings`, {
        driverId,
        origin,
        destination
      });
      return response.data;
    } catch (error) {
      console.error('Error booking driver:', error);
      throw error;
    }
  }

  async function addPassenger(passengerData) {
    try {
      const response = await axios.post('/passengers', passengerData);
      return response.data;
    } catch (error) {
      console.error('Error adding passenger:', error);
      throw error;
    }
  }

  async function addDriver(driverData) {
    try {
      const response = await axios.post('/drivers', driverData);
      return response.data;
    } catch (error) {
      console.error('Error adding driver:', error);
      throw error;
    }
  }

  async function sendEmail(name, email, message) {
    try {
      const emailData = { name, email, message };
      const response = await sendEmailService.insert(emailData);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  return {
    count,
    doubleCount,
    increment,
    fetchPassengers,
    fetchPassenger,
    fetchDrivers,
    fetchDriver,
    bookDriver,
    addPassenger,
    addDriver,
    fetchBookings,
    deletePassenger,
    deleteDriver,
    sendEmail
  }
})
