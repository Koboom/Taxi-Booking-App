<script>
export default {
  data() {
    return {
      dison: false
    }
  },
  methods: {
    close() {
      this.dison = !this.dison
    }
  }
}
</script>

<template>
    <div class="w3-top">
      <div class="w3-bar w3-white w3-card" id="myNavbar">
        <router-link to="/" class="w3-button w3-bar-item w3-wide w3-opacity w3-hover-opacity-off">Yüksel Software Development</router-link>
        <router-link to="/contact" class="w3-button w3-bar-item w3-right w3-hide-small"><i class="fa fa-user"></i> Contact</router-link>
        <router-link to="/cv" class="w3-button w3-bar-item w3-right w3-hide-small"><i class="fa fa-user"></i> CV</router-link>
        <router-link to="/software" class="w3-button w3-bar-item w3-right w3-hide-small">Work(Software)</router-link>
        <router-link to="/work" class="w3-button w3-bar-item w3-right w3-hide-small">Work(Template)</router-link>
        <router-link to="/" class="w3-button w3-green w3-bar-item w3-hover-red w3-right w3-hide-medium w3-hide-large" @click="dison = !dison"><i class="fa fa-bars"></i></router-link>
        <!-- <router-link to="/passengers" class="w3-button w3-green w3-hover-red">Passengers</router-link> -->
        <!-- <router-link to="/drivers" class="w3-button w3-green w3-hover-red">Drivers</router-link> -->
        <!-- <router-link to="/bookings" class="w3-button w3-green w3-hover-red">Bookings</router-link> -->
      </div>
    </div>
    <nav v-show="dison" style="width: 350px;" class="w3-sidebar w3-bar-block w3-card w3-animate-left w3-text-theme">
      <a href="javascript:void(0)" class="w3-bar-item w3-button w3-large w3-padding-16 w3-hover-red w3-theme-d4" @click="dison = !dison">Close</a>
      <router-link to="/" @click="close"  class="w3-button w3-bar-item w3-opacity w3-theme-d3"> Home</router-link>
      <router-link to="/cv" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme-d1">CV</router-link>
      <router-link to="/software" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Work(Software)</router-link>
      <router-link to="/work" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Work(Template)</router-link>
      <router-link to="/contact" @click="close" class="w3-button w3-bar-item w3-opacity w3-theme">Contact</router-link>
    </nav>
    <div class="w3-container w3-margin-top w3-padding-large">
      <router-view></router-view>
    </div>
</template>

<style>
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