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
import RestaurantOrders from "../components/RestaurantOrderView.vue"
import RestaurantDashboard from "../components/RestaurantDashboardView.vue"
import CustomersView from '@/components/CustomersView.vue'
import CustomerView from '@/components/CustomerView.vue'
import WaitersView from '@/components/WaitersView.vue'
import WaiterView from '@/components/WaiterView.vue'
import ItemsView from '@/components/ItemsView.vue'
import ItemView from '@/components/ItemView.vue'
import OrderBookingView from '@/components/OrderBookingView.vue'
import TablesView from '@/components/TablesView.vue'
import TableView from "../components/TableView.vue"
import KasseDashboard from "../components/KasseDashboard.vue"
import Register from '@/components/Register.vue'
import NotFound from '@/components/NotFound.vue'
import Login from "../components/Login.vue"
import ExifExtractor from "../components/ExifExtractor.vue"
import RealTimeChat from '@/components/RealTimeChat.vue'
import AdminPaneli from '@/components/AdminPaneli.vue'
import TensorView from "@/components/TensorView.vue"
import DefaultLayout from '@/views/blogs/DefaultLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/vue/vue_index",
      name: "VueIndex",
      component: () => import("../views/tutorials/vue/vue_index.vue"),
      children: [
        {
          path: "/vue/vue_home",
          name: "VueHome",
          component: () => import("../views/tutorials/vue/vue_home.vue")
        },
        {
          path: "/vue/vue_intro",
          name: "Content1",
          component: () => import("../components/vueTutorials/VueIntro.vue")
        },
        {
          path: "/vue/content2",
          name: "Content2",
          component: () => import("../components/vueTutorials/VueContent2.vue")
        },
        {
          path: "/vue/content3",
          name: "Content3",
          component: () => import("../components/vueTutorials/VueContent3.vue")
        }
      ]
    },
    {
      path: "/defaultAi",
      name: "DefaultAi",
      component: () => import("../views/ai/DefaultAi.vue")
    },
    {
      path: "/realTimeChat",
      name: "RealTimeChat",
      component: RealTimeChat
    },
    {
      path: "/adminPaneli",
      name: "AdminPaneli",
      component: AdminPaneli
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
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
      path: "/blogs",
      name: "Blog",
      component: () => import("../views/Blog.vue")
    },
    {
      path: "/blogs/:blogId",
      name: "BlogPosts",
      component: () => import("../views/blogs/BlogPosts.vue"),
      layout: DefaultLayout,
      meta: {
        title: "Blog Post Title",
        description: "Blog Post Description",
        keywords: ['blog', 'post', 'title', 'description']
      }
    },
    {
      path: "/blogs/blogadd",
      name: "BlogAdd",
      component: () => import("../views/blogs/BlogAdd.vue")
    },
    {
      path: "/passengers",
      name: "Passengers",
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
      name: "Impressum",
      component: Impressum
    },
    {
      path: "/datenschutzerklaerung",
      name: "DatenSchutzErklaerung",
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
      path: "/restaurantOrders",
      name: "RestaurantOrders",
      component: RestaurantOrders
    },
    {
      path: "/restaurantDashboard",
      name: "RestaurantDashboard",
      component: RestaurantDashboard
    },
    {
      path: "/kasseDashboard",
      name: "KasseDashboard",
      component: KasseDashboard
    },
    {
      path: "/customers",
      name: "Customers",
      component: CustomersView
    },
    {
      path: "/customers/:customerId",
      name: "Customer",
      component: CustomerView
    },
    {
      path: "/customers/:customerId/orderBookings/:orderBookingId",
      name: "OrderBooking",
      component: CustomersView
    },
    {
      path: "/waiters",
      name: "Waiters",
      component: WaitersView
    },
    {
      path: "/waiters/:waiterId",
      name: "Waiter",
      component: WaiterView
    },
    {
      path: "/items",
      name: "Items",
      component: ItemsView
    },
    {
      path: "/items/:itemId",
      name: "Item",
      component: ItemView
    },
    {
      path: "/tables",
      name: "Tables",
      component: TablesView
    },
    {
      path: "/tables/:tableId",
      name: "Table",
      component: TableView
    },
    {
      path: "/orderBooking",
      name: "OrderBooking",
      component: OrderBookingView
    },
    {
      path: "/passengerNew",
      name: "PassengerNew",
      component: PassengerNew
    },
    {
      path: "/exifExtractor",
      name: "ExifExtractor",
      component: ExifExtractor
    },
    {
      path: "/tensor",
      name: "TensorView",
      component: TensorView
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    }
  ]
})

export default router
