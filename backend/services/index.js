const passengerService = require("./taxi-booking/passenger-service")
const driverService = require("./taxi-booking/driver-service")
const bookingService = require("./taxi-booking/booking-service")
const customerService = require("./restaurant-dashboard/customer-service")
const itemService = require( "./restaurant-dashboard/item-service")
const menuService = require("./restaurant-dashboard/menu-service")
const orderBookingService = require("./restaurant-dashboard/orderBooking-service")
const paymentService = require("./restaurant-dashboard/payment-service")
const reservationService = require("./restaurant-dashboard/reservation-service")
const reviewService = require("./restaurant-dashboard/review-service")
const staffService = require("./restaurant-dashboard/staff-service")
const tableService = require("./restaurant-dashboard/table-service")
const waiterService = require("./restaurant-dashboard/waiter-service")
const userService = require("./user-service")
const messageService = require("./chat-room-socket/message-service")
const chatRoomService = require("./chat-room-socket/chatroom-service")


module.exports = {
    passengerService,
    driverService,
    bookingService,
    customerService,
    itemService,
    menuService,
    orderBookingService,
    paymentService,
    reservationService,
    reviewService,
    staffService,
    tableService,
    waiterService,
    userService,
    messageService,
    chatRoomService
 }
