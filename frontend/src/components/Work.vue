<script>
   export default {
    data() {
        return {
            disOn: false,
            textOn: "More"
        }
    }
   }
</script>

<template>
    <div class="w3-margin-top w3-padding-64 " id="work">
        <div>
        <h2 class="w3-center w3-text-red">Meine Referenz Templates</h2>

        <div class="w3-row-padding" style="margin-top: 64px;">
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3 class="">Cafe Template</h3>
                <a href="./cafe.html" class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-17 184916.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Music Template</h3>
                <a href="./music.html" class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-17 202225.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Catering Template</h3>
                <a href="./catering.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-17 205849.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Architekt Template</h3>
                <a href="./architekt.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-18 165755.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Parallax Template</h3>
                <a href="http://yukselweb.de/"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-18 165353.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Fashion Template</h3>
                <a href="./fashion.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-18 174148.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
        </div><br>

        <div class="w3-center w3-margin">
            <button class="w3-button w3-green w3-round" @click="disOn = !disOn">{{textOn}}</button>
        </div>

        <div class="w3-row-padding w3-animate-opacity" style="margin-top: 64px;" v-show="disOn">
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3 class="">Hotel Template</h3>
                <a href="./hotel.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-21 075544.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Analytics Template</h3>
                <a href="./analytics.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-21 081300.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Social  Media Template</h3>
                <a href="./innenRaumSocialMedia.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-21 083604.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>App Launch Template</h3>
                <a href="./appLaunch.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-21 090156.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Innenarchitektur Template</h3>
                <a href="./innenarchitektur.html"   class="w3-btn w3-round">
                    <img src="../components/icons/design-2791442_1920.jpg" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
            <div class="w3-col l6 m6 w3-center w3-card w3-hover-opacity"><br>
                <h3>Pizza Restaurant Template</h3>
                <a href="./pizzaRestaurant.html"   class="w3-btn w3-round">
                    <img src="../components/icons/Screenshot 2024-01-21 100717.png" alt="" style="width: 100%;" height="200px">
                </a> <br><br>
            </div>
        </div><br>

    </div>


    </div>
</template>

<style></style>