<template>
    <div class="contact-form">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="formData.name" type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="formData.email" type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea v-model="formData.message" id="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <div class="w3-container">
        <p>{{ formData.message }}</p>
      </div>
    </div>
  </template>

  <script>
  import { defineComponent } from 'vue';
  import { useCounterStore } from '@/stores/counter';
  import axios from 'axios';

  export default defineComponent({
    name: 'ContactForm',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          // Pinia store'unuzdan sendEmail methodunu çağırarak backend'e form verilerini gönderin
          await axios.post("/send_email", this.formData)

          // Başarılı bir şekilde gönderildiğinde mesajı göster veya başka bir işlem yap
        } catch (error) {
          console.error('Error sending email:', error);
          // Hata durumunda kullanıcıya bildir veya başka bir işlem yap
        }
      }
    }
  });
  </script>

  <style scoped>
   .contact-form {
    margin: 0;
    padding: 10px;

  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    font-weight: bold;
  }
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>
