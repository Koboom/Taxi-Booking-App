import { createRouter, createWebHistory } from 'vue-router'
import Passengers from "../components/Passengers.vue"
import Home from "../views/Home.vue"
import Drivers from "../components/Drivers.vue"
import Passenger from "../components/Passenger.vue"
import Driver from "../components/Driver.vue"
import Impressum from "../components/Impressum.vue"
import DatenSchutzErklaerung from "../components/DatenSchutzErklaerung.vue"
import Work from "../components/Work.vue"
import ContactForm from '../components/ContactForm.vue'
import CV from "../components/CVview.vue"
import SoftwareMainView from "../components/SoftwareView.vue"
import TaxiBookingsView from '@/components/TaxiBookingsView.vue'
import TaxiAllBookingsView from '@/components/TaxiAllBookingsView.vue'
import PassengerNew from "../components/PassengerNew.vue"
import CafeView from "../components/CafeView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/cv",
      name: "CV",
      component: CV
    },
    {
      path: "/work",
      name: "Work",
      component: Work
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactForm
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
      path: "/impressum",
      name: "impressum",
      component: Impressum
    },
    {
      path: "/datenschutzerklaerung",
      name: "datenschutzerklaerung",
      component: DatenSchutzErklaerung
    },
    {
      path: "/software",
      name: "Software",
      component: SoftwareMainView
    },
    {
      path: "/taxiBookingsHauptSeite",
      name: "TaxiBookingsHauptSeite",
      component: TaxiBookingsView
    },
    {
      path: "/taxiAllbookings",
      name: "TaxiAllBookings",
      component: TaxiAllBookingsView
    },
    {
      path: "/passengerNew",
      name: "PassengerNew",
      component: PassengerNew
    }
  ]
})

export default router
