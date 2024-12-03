<template>
    <form @submit.prevent="handleSubmit">
      <!-- Diğer form alanları -->
      <input type="text" v-model="formData.name" placeholder="Your Name" required />
      <input type="email" v-model="formData.email" placeholder="Your Email" required />
      <!-- Diğer form alanları -->
      <input type="submit" value="Submit">
    </form>
</template>

  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: ''
        }
      };
    },
    methods: {
      async handleSubmit() {
        try {
          // reCAPTCHA'yı çalıştırın ve token alın
          const token = await grecaptcha.execute('your_site_key', { action: 'submit' });

          // Form verilerini ve reCAPTCHA token'ı ile backend'e POST isteği gönderin
          const response = await this.$http.post('/api/submit', {
            ...this.formData,
            token
          });

          // Yanıtı işleme
          if (response.data.success) {
            alert('Form başarıyla gönderildi!');
            // Form verilerini temizle
            this.formData = {
              name: '',
              email: ''
            };
          } else {
            alert('reCAPTCHA doğrulaması başarısız oldu.');
          }
        } catch (error) {
          console.error('Form gönderimi sırasında bir hata oluştu:', error);
          alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }
    }
  }
  </script>
