<script>
export default {
    mounted() {
        this.$router.push('/vue/vue_home')
    }
}
</script>

<template>
    <div class="w3-row">
        <div class="w3-col l2">
            <VueTutorialNavbar/>
        </div>
        <div style="margin-left: 15%;" class="w3-container w3-flat-wet-asphalt w3-col l8" >
            <router-view></router-view>
        </div>

        <div class="w3-col l2">
            <Vue_right/>
        </div>
    </div>
    </template>

<style>
p, h2 {
    color: whitesmoke;
}
</style>