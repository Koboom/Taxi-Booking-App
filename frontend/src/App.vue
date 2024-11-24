<template>
  <div id="app">
    <!-- Navbar (Üst Menü) -->
    <div class="w3-bar w3-card" id="myNavbar">
      <router-link to="/" class="w3-button w3-bar-item">Yüksel Software Development</router-link>
      <router-link to="/register" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Register</router-link>
      <router-link to="/contact" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Contact</router-link>
      <router-link to="/cv" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">CV</router-link>
      <router-link to="/software" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Work(Software)</router-link>
      <router-link to="/work" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Work(Template)</router-link>
      <!-- <router-link to="/tensor" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Yapay Zeka</router-link> -->
      <!-- <router-link to="/tensor" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Tensor</router-link> -->
      <button class="menu-icon w3-button w3-right w3-hide-large" @click="toggleSidebar">
        <i class="fa fa-bars"></i>
      </button>
    </div>

    <!-- Sidebar (Mobil Ekran) -->
    <div v-if="showSidebar" class="sidebar-overlay" @click="toggleSidebar"></div>
    <nav v-show="showSidebar" class="w3-sidebar w3-bar-block sidebar-content">
      <a class="w3-bar-item w3-button w3-large" @click="toggleSidebar">Close &times;</a>
      <router-link to="/" @click="toggleSidebar" class="w3-bar-item w3-button">Home</router-link>
      <router-link to="/cv" @click="toggleSidebar" class="w3-bar-item w3-button">CV</router-link>
      <router-link to="/software" @click="toggleSidebar" class="w3-bar-item w3-button">Work(Software)</router-link>
      <router-link to="/work" @click="toggleSidebar" class="w3-bar-item w3-button">Work(Template)</router-link>
    </nav>

    <!-- ReCaptcha Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close">&times;</span>
        <RecaptchaForm />
      </div>
    </div>

    <!-- Ana İçerik -->
    <router-view></router-view>
  </div>
</template>

<script>
import RecaptchaForm from "@/components/RecaptchaForm.vue";

export default {
  components: { RecaptchaForm },
  data() {
    return {
      showSidebar: false,
      showModal: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style scoped>
/* Navbar ve Sidebar Stil */
.navbar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.menu-icon {
  display: none;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  .sidebar-content {
    position: fixed;
    width: 250px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f4f4f4;
    z-index: 1000;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  .sidebar-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

/* Modal Stilleri */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
