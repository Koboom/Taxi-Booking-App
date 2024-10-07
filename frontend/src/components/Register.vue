<template>
  <div class="register-container">
    <h2>Registrieren</h2>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="form-group">
        <label>Benutzer Name(eMail):</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="firstName" required />
      </div>
      <div class="form-group">
        <label>Nachname:</label>
        <input type="text" v-model="lastName" required />
      </div>
      <div class="form-group">
        <label>Telefon:</label>
        <input type="text" v-model="phone" required />
      </div>
      <div class="form-group">
        <label>Standort:</label>
        <input type="text" v-model="location" required />
      </div>
      <div class="form-group">
        <label>Alter:</label>
        <input type="number" v-model="age" required />
      </div>
      <!-- <div class="form-group">
        <label>Administrator?</label>
        <input type="checkbox" v-model="isAdmin" />
      </div> -->
      <button type="submit" class="submit-button">Sign up</button>
      <span class="w3-center">or</span>
      <a href="login" class="w3-button w3-green w3-hover-red">Login</a>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
      age: null,
      isAdmin: false,
      message: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('https://backend-fimqwb2tta-ez.a.run.app/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          location: this.location,
          age: this.age,
          isAdmin: this.isAdmin,
        });
        this.message = response.data.message;
        this.$router.push('/login');
      } catch (error) {
        this.message = 'Die Registrierung ist fehlgeschlagen: ' + error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 3px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

input[type="checkbox"] {
  margin-top: 10px;
}

.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 15px;
  color: green;
  text-align: center;
}
</style>
