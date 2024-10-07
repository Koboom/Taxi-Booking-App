<script>
import RecaptchaForm from "@/components/RecaptchaForm.vue"

export default {
  components: {
    RecaptchaForm
  },
  data() {
    return {
      isLoggedIn: false,
      dison: false,
      showModal: false,
      showSignUpModal: false, //Sign up için modal
      showLoginModal: false, // Login için modal
      email: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      age: "",
      isAdmin: false,
      users: [],
      user: {},
      showPassword: false, // password göstersin mi?
      showPasswordRepeat: false, // password göstersin mi?
      newUser: {} //kullanıcının ismini yukarıda gösterebilmek için
    }
  },
  mounted() {
    const user = localStorage.getItem("user")
    if (user) {
      this.isLoggedIn = true
    }
  },
  computed: {

  },
  methods: {
    close() {
      this.dison = !this.dison
    },
    closeModal() {
      this.showModal = false
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    togglePasswordRepeat() {
      this.showPasswordRepeat = !this.showPasswordRepeat
    }
  }
}
</script>

<template>
    <div class="" id="app" >
      <!-- Navbar (sit on top) -->
      <div class="w3-bar w3-card-4" id="myNavbar">
        <router-link to="/" class="w3-button w3-bar-item w3-wide w3-opacity w3-hover-opacity-off"> Yüksel Software Development</router-link>
        <!-- <router-link to="/register" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium ">Register</router-link> -->
        <!-- <router-link to="/login" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium ">Login</router-link> -->
        <!-- <span class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium"><i class="fa fa-user"></i></span> -->
        <router-link to="/contact" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium "> Contact</router-link>
        <router-link to="/cv" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium "> CV</router-link>
        <router-link to="/software" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium ">Work(Software)</router-link>
        <router-link to="/work" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium ">Work(Template)</router-link>
        <!-- Sign up Button -->
        <router-link to="" class="w3-button w3-green w3-bar-item w3-hover-red w3-right w3-hide-large" @click="dison = !dison"><i class="fa fa-bars"></i></router-link>
      </div>
      <!-- Navbar on small screens/mobile (Hidden on medium and large screens) -->
      <nav v-show="dison" style="width: 350px;" class="w3-sidebar w3-bar-block w3-card w3-animate-left w3-text-theme w3-hide-large">
        <a href="javascript:void(0)" class="w3-bar-item w3-button w3-large w3-padding-16 w3-hover-red w3-theme-d4" @click="dison = !dison">Close</a>
        <router-link to="/" @click="close"  class="w3-button w3-bar-item w3-opacity w3-theme-d3"> Home</router-link>
        <router-link to="/cv" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme-d1">CV</router-link>
        <router-link to="/software" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Work(Software)</router-link>
        <router-link to="/work" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Work(Template)</router-link>
        <router-link to="/contact" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Contact</router-link>
        <!-- <router-link to="/login" @click="close"  class="w3-button w3-bar-item w3-opacity w3-theme-d3"> Login</router-link> -->
        <!-- <router-link to="/register" @click="close"  class="w3-button w3-bar-item w3-opacity w3-theme-d3"> Register</router-link> -->
      </nav>

      <!-- Login Modal -->
      <div v-if="showLoginModal" class="modal w3-animate-top w3-container">
        <div class="circle"></div>
        <div class="modal-content" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; width: 60%; background-color: aliceblue;">
          <span class="close" @click="showLoginModal = false">&times;</span>
          <!-- Login Form -->
          <form action="" @submit.prevent="handleLogin">
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
                  </li>
              </ul>
            </div>
           </form>
           <footer>
            <!-- Existing users, login <a href="/login">here</a> -->
           </footer>
        </div>
      </div>


      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span @click="showModal = false" class="close">&times;</span>
            <RecaptchaForm/>
        </div>
      </div>

        <!-- Router View -->
        <div class="">
          <router-view></router-view>
        </div>
        <!-- reCAPTCHA Form -->
        <!-- <RecaptchaForm/> -->
      </div>
    </template>

<style>
/* vertical line */
.vl {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border: 2px solid #ddd;
  height: 175px;
}

/* text inside the vertical line */
.vl-innertext {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 8px 10px;
}
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
.circle {
    position: fixed;
    top: -50vmin;
    left: -50vmin;
    width: 100vmin;
    height: 100vmin;
    border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%;
    background: #65c8ff;
}
.circle::after {
    content: "";
    position: inherit;
    right: -50vmin;
    bottom: -55vmin;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: #143d81;
}
.logo {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  height: 64px;
  width: 64px;
  top: 30px;
  left: 50%;
  translate: -50% 0;
}
.logo i {
  font-size: 50px;
  color: #216ce7;
  font-weight: 500;
}

.w3-theme {
  color:#fff !important;background-color:#3f51b5 !important}
.w3-theme-light {
color:#000 !important;background-color:#e8eaf6 !important}
.w3-theme-dark {
color:#fff !important;background-color:#1a237e !important}
.w3-theme-l5 {
color:#000 !important;background-color:#e8eaf6 !important}
.w3-theme-l4 {
color:#000 !important;background-color:#c5cae9 !important}
.w3-theme-l3 {
color:#000 !important;background-color:#9fa8da !important}
.w3-theme-l2 {
color:#fff !important;background-color:#7986cb !important}
.w3-theme-l1 {
color:#fff !important;background-color:#5c6bc0 !important}
.w3-theme-d1 {
color:#fff !important;background-color:#3949ab !important}
.w3-theme-d2 {
color:#fff !important;background-color:#303f9f !important}
.w3-theme-d3 {
color:#fff !important;background-color:#283593 !important}
.w3-theme-d4 {
color:#fff !important;background-color:#1a237e !important}
.w3-theme-action {
color:#fff !important;background-color:#311b92 !important}
.w3-text-theme {
color:#1a237e !important}
</style>
