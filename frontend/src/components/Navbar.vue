<script>
export default {
    data() {
        return {
        showSidebar: false,
        };
    },
    methods: {
        toggleSidebar() {
          this.showSidebar = !this.showSidebar;
        },
  },
};
</script>
<template>
    <div class="w3-top">
        <div class="w3-bar w3-card-4" style="background-color:#090c11; color: #dde4ee;">
            <router-link to="/" id="home" class="w3-button w3-hover-green w3-ripple w3-bar-item">HOME
                <i class="fa fa-home"></i>
            </router-link>
            <!-- <router-link to="/register" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Register</router-link> -->
            <router-link to="/contact" class="w3-button w3-bar-item w3-hover-green w3-right w3-hide-small w3-hide-medium">Contact</router-link>
            <router-link to="/cv" class="w3-button w3-bar-item w3-right w3-hover-green w3-hide-small w3-hide-medium">CV</router-link>
            <router-link to="/software" class="w3-button w3-bar-item w3-right w3-hover-green w3-hide-small w3-hide-medium">Work(Software)</router-link>
            <router-link to="/work" class="w3-button w3-bar-item w3-right w3-hide-small w3-hover-green w3-hide-medium">Work(Template)</router-link>
            <router-link to="/vue/vue_index" class="w3-button w3-bar-item w3-right w3-hover-green w3-hide-small w3-hide-medium">Vue Tutorial (TR)</router-link>
            <!-- <router-link to="/blogs" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Blog</router-link> -->
            <!-- <router-link to="/defaultAi" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Machine Learning</router-link>
            <router-link to="/blogs/BlogAdd" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">BlogAdd</router-link> -->
            <!-- <router-link to="/blogs/BlogAdd" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">BlogAdd</router-link> -->
            <!-- <router-link to="/tensor" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Yapay Zeka</router-link> -->
            <!-- <router-link to="/tensor" class="w3-button w3-bar-item w3-right w3-hide-small w3-hide-medium">Tensor</router-link> -->
            <button class="menu-icon w3-button w3-right w3-hide-large" @click="toggleSidebar">
              <i class="fa fa-bars"></i>
            </button>
        </div>

        <!-- Sidebar (Mobil Ekran) -->
        <div v-if="showSidebar" class="sidebar-overlay" @click="toggleSidebar"></div>
        <nav v-show="showSidebar" class="w3-sidebar w3-bar-block sidebar-content w3-animate-left">
          <a class="w3-bar-item w3-button w3-large" @click="toggleSidebar">Close &times;</a>
          <router-link to="/" @click="toggleSidebar" class="w3-bar-item w3-button">Home</router-link>
          <router-link to="/cv" @click="toggleSidebar" class="w3-bar-item w3-button">CV</router-link>
          <router-link to="/software" @click="toggleSidebar" class="w3-bar-item w3-button">Work(Software)</router-link>
          <router-link to="/work" @click="toggleSidebar" class="w3-bar-item w3-button">Work(Template)</router-link>
          <router-link to="/vue/vue_index" @click="toggleSidebar" class="w3-bar-item w3-button">Vue Tutorial (TR)</router-link>
          <!-- <router-link to="/blogs" @click="toggleSidebar" class="w3-bar-item w3-button">Blog</router-link> -->
          <!-- <router-link to="/defaultAi" @click="toggleSidebar" class="w3-bar-item w3-button">Machine Learning</router-link> -->
        </nav>
    </div>
</template>

<style scoped>
    @media (max-width: 768px) {
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
</style>