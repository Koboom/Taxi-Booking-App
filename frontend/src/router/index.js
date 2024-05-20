import { createRouter, createWebHistory } from 'vue-router'
import Passengers from "../components/Passengers.vue"
import Home from "../views/Home.vue"
import Drivers from "../components/Drivers.vue"
import Passenger from "../components/Passenger.vue"
import Driver from "../components/Driver.vue"
import Bookings from "../components/Bookings.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/passengers",
      name:"Passengers",
      component: Passengers
    },
    {
      path: "/passengers/:passengerId",
      name: "Passenger",
      component: Passenger
    },
    {
      path: "/drivers",
      name: "Drivers",
      component: Drivers
    },
    {
      path: "/drivers/:driverId",
      name: "Driver",
      component: Driver
    },
    {
      path: "/passengers/:passengerId/bookings/:bookingId",
      name: "Booking",
      component: Passengers
    },
    {
      path: "/bookings",
      name: "Bookings",
      component: Bookings
    }
  ]
})

export default router
