import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3000/'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  async function fetchPassengers() {
    const request = await axios.get("/passengers")
    return request.data
  }
  async function fetchPassenger(passengerId) {
    const request = await axios.get(`/passengers/${passengerId}`)
    return request.data
  }
  async function fetchDrivers() {
    const request = await axios.get("/drivers")
    return request.data
  }
  async function fetchDriver(driverId) {
    const request = await axios.get(`/drivers/${driverId}`)
    return request.data
  }
  async function bookDriver({ passengerId, driverId, origin, destination}) {
    const request = await axios.post(`/passengers/${passengerId}/bookings`, {
      driverId, origin, destination
    })
    return request.data
  }
  async function addPassenger(passengerData) {
    const request = await axios.post("/passengers", passengerData)
    return request.data
  }
  async function addDriver(driverData) {
    const request = await axios.post("/drivers", driverData)
    return request.data
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
    addDriver
  }
})
