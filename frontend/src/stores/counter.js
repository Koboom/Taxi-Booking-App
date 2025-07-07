import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// const BASE_URL = 'https://backend-fimqwb2tta-ez.a.run.app/'
const BASE_URL = 'http://localhost:3000' // Local development URL

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  async function fetchUsers() {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async function fetchUser(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  }

  async function addUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async function loginUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data
    } catch (error) {
      if (error.response) {
        // Sunucu yanıtı alındı, ama bir hata durumu döndü
        console.error('Sunucu yanıtı:', error.response.data);
        console.error('Durum kodu:', error.response.status);
        alert(`Hata: ${error.response.data.message}`); // Sunucu mesajını kullanıcıya göster
      } else if (error.request) {
        // İstek yapıldı, ama yanıt alınamadı
        console.error('İstek yapıldı ama yanıt alınamadı:', error.request);
      } else {
        // Başka bir hata yapıldı
        console.error('Başka bir hata yapıldı:', error.message);
      }

      throw error;
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`)
        return response.data
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }

  async function logout(userId) { // update e benzettim. deleted özelliğini true yapıp user'ı sakladım. logout oldu.updateWaiter dan örnek aldım.
    try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}`, { deleted: true })
      return response.data
    } catch (error) {
      console.error(`Error deleting user ${userId};`, error)
      throw error
    }
  }

  async function login(userId) { // update e benzettim. deleted özelliğini true yapıp user'ı sakladım. logout oldu.updateWaiter dan örnek aldım.
    try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}`, { deleted: false })
      return response.data
    } catch (error) {
      console.error(`Error deleting user ${userId};`, error)
      throw error
    }
  }

  async function fetchPassengers() {
    try {
      const response = await axios.get(`${BASE_URL}/passengers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching passengers:', error);
      throw error;
    }
  }

  async function fetchBlogs() {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`)
      return response.data
    } catch(error) {
      console.error('Error fetching blogs: ', error)
      throw error;
    }
  }

  async function fetchBlog(blogId) {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${blogId}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching blog ${blogId}:`, error)
      throw error;
    }
  }

  async function updateBlog(blogId, blogData) {
    try {
      const response = await axios.put(`${BASE_URL}/blogs/${blogId}`, blogData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${blogId}:`, error);
      throw error;
    }
  }

  async function addBlog(blogData) {
    try {
      console.log('Sending blog data:', blogData); // Gönderilen veriyi kontrol etmek için eklendi
      const response = await axios.post(`${BASE_URL}/blogs`, blogData);
      console.log('API Response:', response); // Yanıtı tam olarak kontrol etmek için eklendi
      return response.data; // `response.data`'yı döndürün
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error;
    }
  }

  async function deleteFetchBlog(blogId){
    try {
      const response = await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("Dlete responce: ", response)
      return response.data
    } catch (error) {
      console.error(`Error deleting item ${blogId}:`, error);
      throw error;
    }
  }

  async function fetchPassenger(passengerId) {
    try {
      const response = await axios.get(`${BASE_URL}/passengers/${passengerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching passenger ${passengerId}:`, error);
      throw error;
    }
  }

  async function deletePassenger(passengerId) {
    try {
      const response = await axios.delete(`${BASE_URL}/passengers/${passengerId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting passenger ${passengerId}:`, error);
      throw error;
    }
  }

  async function deleteDriver(driverId) {
    try {
      const response = await axios.delete(`${BASE_URL}/drivers/${driverId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting passenger ${driverId}:`, error);
      throw error;
    }
  }

  async function fetchDrivers() {
    try {
      const response = await axios.get(`${BASE_URL}/drivers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  }

  async function fetchDriver(driverId) {
    try {
      const response = await axios.get(`${BASE_URL}/drivers/${driverId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching driver ${driverId}:`, error);
      throw error;
    }
  }

  async function fetchBookings() {
    try {
      const response = await axios.get(`${BASE_URL}/bookings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async function bookDriver({ passengerId, driverId, origin, destination }) {
    try {
      const response = await axios.post(`${BASE_URL}/passengers/${passengerId}/bookings`, {
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
      const response = await axios.post(`${BASE_URL}/passengers`, passengerData);
      return response.data;
    } catch (error) {
      console.error('Error adding passenger:', error);
      throw error;
    }
  }

  async function addDriver(driverData) {
    try {
      const response = await axios.post(`${BASE_URL}/drivers`, driverData);
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

  async function fetchCustomers() {
    try {
      const response = await axios.get(`${BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async function fetchCustomer(customerId) {
    try {
      const response = await axios.get(`${BASE_URL}/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error);
      throw error;
    }
  }

  async function addCustomer(customerData) {
    try {
      const response = await axios.post(`${BASE_URL}/customers`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error adding passenger:', error);
      throw error;
    }
  }

  async function deleteFetchCustomer(customerId) {
    try {
      const response = await axios.delete(`${BASE_URL}/customers/${customerId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting passenger ${customerId}:`, error);
      throw error;
    }
  }

  async function fetchWaiters() {
    try {
      const response = await axios.get(`${BASE_URL}/waiters`);
      return response.data;
    } catch (error) {
      console.error('Error fetching waiters:', error);
      throw error;
    }
  }

  async function addWaiter(waiterData) {
    try {
      console.log('Sending waiter data:', waiterData); // Gönderilen veriyi kontrol etmek için eklendi
      const response = await axios.post(`${BASE_URL}/waiters`, waiterData);
      console.log("API Response", response) // Yanıtı tam olarak kontrol etmek için eklendi
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          'API Error Response:',
          error.response.data
        );
      } else if (error.request) {
        console.error(
          'No Response:',
          error.request
        );
      } else {
        console.error(
          'Error Message:',
          error.message
        )
      }
      throw error;
    }
  }

  async function fetchWaiter(waiterId) {
    try {
      const response = await axios.get(`${BASE_URL}/waiters/${waiterId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching waiter ${waiterId}:`, error);
      throw error;
    }
  }

  async function updateWaiter(waiterId, waiterData) {
    try {
      const response = await axios.put(`${BASE_URL}/waiters/${waiterId}`, waiterData)
      return response.data
    } catch (error) {
      console.error(`Error updating waiter ${waiterId}:`, error);
      throw error;
    }
  }

  async function deleteFetchWaiter(waiterId) {
    try {
      const response = await axios.delete(`${BASE_URL}/waiters/${waiterId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting waiter ${waiterId}:`, error);
      throw error;
    }
  }

  async function fetchItems() {
    try {
      const response = await axios.get(`${BASE_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async function fetchItem(itemId) {
    try {
      const response = await axios.get(`${BASE_URL}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${itemId}:`, error);
      throw error;
    }
  }

  async function updateItem(itemId, itemData) {
    try {
      const response = await axios.put(`${BASE_URL}/items/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${itemId}:`, error);
      throw error;
    }
  }

  async function addItem(itemData) {
    try {
      console.log('Sending item data:', itemData); // Gönderilen veriyi kontrol etmek için eklendi
      const response = await axios.post(`${BASE_URL}/items`, itemData);
      console.log('API Response:', response); // Yanıtı tam olarak kontrol etmek için eklendi
      return response.data; // `response.data`'yı döndürün
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error;
    }
  }

  async function deleteFetchItem(itemId){
    try {
      const response = await axios.delete(`${BASE_URL}/items/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("Dlete responce: ", response)
      return response.data
    } catch (error) {
      console.error(`Error deleting item ${itemId}:`, error);
      throw error;
    }
  }

  async function fetchTables() {
    try {
      const response = await axios.get(`${BASE_URL}/tables`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tables:', error);
      throw error;
    }
  }

  async function addTable(tableData) {
    try {
      console.log('Sending table data:', tableData); // Gönderilen veriyi kontrol etmek için eklendi
      const response = await axios.post(`${BASE_URL}/tables`, tableData);
      console.log('API Response:', response); // Yanıtı tam olarak kontrol etmek için eklendi
      return response.data; // `response.data`'yı döndürün
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error;
    }
  }

  async function fetchTable(tableId) {
    try {
      const response = await axios.get(`${BASE_URL}/tables/${tableId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching  ${tableId}:`, error);
      throw error;
    }
  }

  async function updateTable(tableId, tableData) {
    try {
      const response = await axios.put(`${BASE_URL}/tables/${tableId}`, tableData);
      return response.data;
    } catch (error) {
      console.error(`Error updating table ${tableId}:`, error);
      throw error;
    }
  }

  async function fetchOrderBookings() {
    try {
      const response = await axios.get(`${BASE_URL}/orderBookings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Order bookings:', error);
      throw error;
    }
  }

  async function bookOrder({ itemId, customerId, orderStart, orderEnd}) {
    try {
      const response = await axios.post(`${BASE_URL}/customers/${customerId}/orderBookings`, {
        itemId,
        orderStart,
        orderEnd
      });
      return response.data;
    } catch (error) {
      console.error('Error booking order:', error);
      throw error;
    }
  }
  // Function to register user
  async function registerUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, userData);
      message.value = response.data.message;
      return response.data; // Optionally return data if needed
    } catch (error) {
      message.value = 'Kayıt başarısız: ' + error.response?.data?.message || 'Unknown error';
      throw error; // Rethrow the error for further handling if needed
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
    sendEmail,
    fetchCustomers,
    fetchCustomer,
    addCustomer,
    deleteFetchCustomer,
    fetchWaiters,
    fetchWaiter,
    deleteFetchWaiter,
    addWaiter,
    updateWaiter,
    fetchItems,
    fetchItem,
    addItem,
    updateItem,
    deleteFetchItem,
    fetchTables,
    addTable,
    fetchTable,
    updateTable,
    fetchOrderBookings,
    bookOrder,
    fetchUsers,
    addUser,
    fetchUser,
    deleteUser,
    logout,
    login,
    loginUser,
    registerUser,
    fetchBlogs,
    fetchBlog,
    updateBlog,
    addBlog,
    deleteFetchBlog
  }
})
