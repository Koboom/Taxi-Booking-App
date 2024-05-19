<script></script>

<template>
    <div class="w3-container">
      <router-link to="/" class="w3-button w3-green w3-hover-red">Home</router-link>
      <router-link to="/passengers" class="w3-button w3-green w3-hover-red">Passengers</router-link>
      <router-link to="/drivers" class="w3-button w3-green w3-hover-red">Drivers</router-link>
    </div>
    <div class="w3-container">
      <router-view></router-view>
    </div>
</template>

<style></style>