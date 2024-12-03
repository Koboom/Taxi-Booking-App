<script>
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      formData: {
        name: '',
        lastname: "",
        email: '',
        phone: "",
        message: ''
      }
    };
  },
  methods: {
    async submitForm() {
      // EmailJS için gerekli bilgileri buraya ekleyin
      const serviceID = 'service_brxny4s';
      const templateID = 'template_u9b1cm3';
      const userID = 'SGZlSzOXIsZEDbkUc';

      try {
        const response = await emailjs.send(serviceID, templateID,{
          ...this.formData,
          from_email: this.formData.email
        }, userID);
        console.log('SUCCESS!', response.status, response.text);
        alert('Ihre Nachricht wurde erfolgreich gesendet!');
        this.formData.name = '';
        this.formData.lastname = '';
        this.formData.email = '';
        this.formData.phone = '';
        this.formData.message = '';
      } catch (error) {
        console.error('Fehler beim E-Mail-Versand:', error);
        alert('Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
    }
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
    <h2>Kontakt Formular</h2>
    <div class="w3-row w3-section">
      <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
        <div class="w3-rest">
          <input class="w3-input w3-border" v-model="formData.name" name="first" type="text" required placeholder="Vorname">
        </div>
    </div>
    <div class="w3-row w3-section">
      <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
        <div class="w3-rest">
          <input class="w3-input w3-border" v-model="formData.lastname" name="last" type="text" required placeholder="Nachname">
        </div>
    </div>
    <div class="w3-row w3-section">
      <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-envelope-o"></i></div>
        <div class="w3-rest">
          <input class="w3-input w3-border" v-model="formData.email" name="email" type="text" required placeholder="Email">
        </div>
    </div>
    <div class="w3-row w3-section">
      <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-phone"></i></div>
        <div class="w3-rest">
          <input class="w3-input w3-border" v-model="formData.phone" name="phone" type="text" required placeholder="Phone" >
        </div>
    </div>
    <div class="w3-row w3-section">
      <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-pencil"></i></div>
        <div class="w3-rest">
          <textarea name="message" id="" cols="30" rows="10" class="w3-input w3-border" v-model="formData.message" required placeholder="Message">

          </textarea>
        </div>
    </div>
    <button type="submit" class="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Send</button>
  </form>

  <div class="">
     <footer-view ></footer-view>
  </div>
</template>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #218838;
}
</style>