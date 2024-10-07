<template>
    <div v-if="showLoginModal" class="modal w3-animate-top w3-container">
      <div class="circle"></div>
      <div class="modal-content" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; width: 60%; background-color: aliceblue;">
        <!-- <span class="close" @click="showLoginModal = false">&times;</span> -->
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="w3-row w3-section">
            <h3 class="w3-center">Login <span>with Social Media or Manually</span></h3>
          </div>
          <div class="w3-container w3-row w3-center w3-col l6 m12 s12">
            <ul class="w3-ul">
              <li>
                <a href="#" class="w3-button w3-red w3-margin-bottom">
                  <i class="fa fa-google w3-xxlarge"></i>
                  <span class="w3-hide-small w3-hide-medium">oogle</span>
                </a>
              </li>
              <li>
                <a href="#" class="w3-button w3-blue w3-margin-bottom">
                  <i class="fa fa-facebook w3-xxlarge"></i>
                  <span class="w3-hide-small w3-hide-medium">acebook</span>
                </a>
              </li>
              <li>
                <a href="#" class="w3-button w3-red w3-margin-bottom">
                  <i class="fa fa-twitter w3-xxlarge"></i>
                  <span class="w3-hide-small w3-hide-medium">Twitter</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- right side -->
          <div class="w3-container w3-row w3-col l6 m12 s12">
            <ul class="w3-ul">
                <li>
                  <div class="input-container">
                    <input type="email" v-model="email" class="w3-input w3-border w3-margin-bottom" placeholder="Email" required>
                  </div>
                </li>
                <li>
                  <div class="input-container">
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" class="w3-input w3-border w3-margin-bottom" placeholder="Password" required>
                    <span class="toggle-password" @click="togglePassword">
                      👁️
                    </span>
                  </div>
                </li>
                <li>
                  <button type="submit" class="w3-button w3-green w3-hover-red">Login</button>
                  <a href="/" class="w3-button w3-green w3-hover-red w3-right w3-hide-small w3-hide-medium">Home</a>
                  <a href="/" class="w3-button w3-green w3-hover-red w3-right w3-hide-large"><i class="fa fa-home"></i></a>
                  <a href="/register" class="w3-button w3-green w3-hover-red w3-right w3-hide-small w3-hide-medium">Register</a>
                  <a href="/register" class="w3-button w3-green w3-hover-red w3-right w3-hide-large"><i class="fa fa-user"></i></a>
                </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        showLoginModal: true, // Modal başlangıçta gösteriliyor
        email: '',
        password: '',
        showPassword: false,
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      async handleLogin() {
        try {
          const response = await axios.post('https://backend-fimqwb2tta-ez.a.run.app/users/login', {
            username: this.email, // 'username' olarak e-posta gönderiliyor
            password: this.password,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          // Başarılı giriş işlemi
          console.log('Login success:', response.data);

          //Kullanıcı bilgisini yerel depolamaya kaydetme
          localStorage.setItem("user" , JSON.stringify(response.data.user))
          // Giriş başarılı olduğunda kullanıcıyı yönlendirme veya başka bir işlem yapma
          this.$router.push('/'); // Örnek yönlendirme

        } catch (error) {
          // Hata durumunda
          console.error('Login failed:', error.response ? error.response.data : error);
          alert('Login failed. Please check your credentials.');
        }
      },
    },
  };
  </script>

  <style>
  /* Add your modal and input styles here */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Arka planı yarı saydam yap */
    z-index: 1000; /* Modal'ı diğer içeriklerin önünde göster */
  }

  .modal-content {
    background-color: #fff;
    max-width: 90%;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Hafif gölge ekleyerek modal'ı öne çıkar */
    animation: fadeIn 0.3s ease; /* Hafif animasyonla modal'ı görünür yap */
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  .input-container input {
    width: 100%;
    padding-right: 40px;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  </style>
