<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

export default {
    name: "Passengers",
    data() {
        return {
            passengers: [],
            name: "",
            surname: "",
            location: "",
            allBookings: [],
            formData: {
              formName: "",
              formEmail: "",
              formMessage: ""
            }
        }
    },
    async mounted() {
        await this.updatePassengers()
    },
    computed: {
        totalBookings() {
            // Tüm yolcuların rezervasyon sayısını topla
            return this.passengers.reduce((total, passenger) => total + passenger.bookings.length, 0);
        }
    },
    methods: {
    ...mapActions(useCounterStore, ["fetchPassengers", "addPassenger"]),
    async updatePassengers() {
        try {
            this.passengers = await this.fetchPassengers();
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), []);
        } catch (error) {
            console.error("Passagiere konnten nicht aktualisiert werden:", error);
            alert('Passagiere konnten nicht aktualisiert werden. Bitte versuchen Sie es später noch einmal.');
        }
    },
    async addNewPassenger() {
        if (!this.name || !this.surname || !this.location) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
        try {
            await this.addPassenger({
                name: this.name,
                surname: this.surname,
                location: this.location
            });
            this.name = "";
            this.surname = "";
            this.location = "";
            await this.updatePassengers();
        } catch (error) {
            console.error("Passagiere konnten nicht aktualisiert werden:", error);
            alert('Passagiere konnten nicht aktualisiert werden. Bitte versuchen Sie es später noch einmal.');
        }
    }
}

}
</script>

<template>
    <header class="w3-display-container">
      <div class="header">
    <!--Content before waves-->
        <div class="inner-header flex w3-opacity-max">
          <h1 class=""><i>Yüksel Software Development</i></h1>
          <div class="drop-container">
            <div class="drop"></div>
          </div>
        </div>
    <!--Waves Container-->
        <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
            </svg>
        </div>

    <!--Waves end-->
      </div>
    <!--Header ends-->

<!--Content ends-->
        <div class="w3-display-bottomleft w3-text-grey w3-large" style="padding: 24px 48px;">
            <a class="w3-xxlarge" target="_blank" href="https://twitter.com/mehmetykselkoy1"> <i class="fa fa-twitter w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" target="_blank" href="https://github.com/Koboom?tab=repositories"> <i class="fa fa-github w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" target="_blank" href="https://www.linkedin.com/in/mehmet-y%C3%BCksel-koyuno%C4%9Flu-7b327423b/"><i class="fa fa-linkedin w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" href="/contact"><i class="fa fa-envelope fa-fw w3-hover-opacity w3-text-green"></i></a><br><br>
        </div>
    </header>
    <!-- Device Looking -->
    <div class="w3-row">
      <div class="w3-col l4 w3-hide-small w3-hide-medium">
        <device-look-smart></device-look-smart>
      </div>
      <div class="w3-col l8 w3-hide-small w3-hide-medium">
        <device-look-tablet></device-look-tablet>
      </div>
    </div>
    <!-- Preis View -->
    <div>
      <preis-view></preis-view>
    </div>
    <!-- Main View -->
    <div>
      <main-zukunft></main-zukunft>
    </div>
    <!-- Footer View -->
    <div>
        <footer-view ></footer-view>
    </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);
.bgimg {
  background: linear-gradient(to bottom right, rgb(42, 9, 9), rgb(51, 26, 3));
  background-size: 200% 200%;
  min-height: 100%;
  width: 100%;
  height: 650px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  animation: wave 3s infinite ease-in-out;
}

.bgimg2 {
  background: linear-gradient(to bottom right, rgb(66, 125, 7), rgb(118, 164, 17));
  background-size: 200% 200%;
  min-height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  animation: wave-reverse 4s infinite ease-in-out;
}

@keyframes wave {
  0%, 100% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 100%;
  }
}

@keyframes wave-reverse {
  0%, 100% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 0% 100%;
  }
}

/* Paralaks hareketi için eklenen stiller */
.wave-parallax1-template--17695973474528__ss_wave_2_g3hbEK > use {
  animation: move-forever1template--17695973474528__ss_wave_2_g3hbEK 10s linear infinite;
}

.wave-parallax2-template--17695973474528__ss_wave_2_g3hbEK > use {
  animation: move-forever2template--17695973474528__ss_wave_2_g3hbEK 10s linear infinite;
}

.wave-parallax3-template--17695973474528__ss_wave_2_g3hbEK > use {
  animation: move-forever3template--17695973474528__ss_wave_2_g3hbEK 10s linear infinite;
}

.wave-parallax4-template--17695973474528__ss_wave_2_g3hbEK > use {
  animation: move-forever4template--17695973474528__ss_wave_2_g3hbEK 10s linear infinite;
}

@keyframes move-forever1template--17695973474528__ss_wave_2_g3hbEK {
  0% {
    transform: translate(85px);
  }
  100% {
    transform: translate(-90px);
  }
}

@keyframes move-forever2template--17695973474528__ss_wave_2_g3hbEK {
  0% {
    transform: translate(-90px);
  }
  100% {
    transform: translate(85px);
  }
}

@keyframes move-forever3template--17695973474528__ss_wave_2_g3hbEK {
  0% {
    transform: translate(85px);
  }
  100% {
    transform: translate(-90px);
  }
}

@keyframes move-forever4template--17695973474528__ss_wave_2_g3hbEK {
  0% {
    transform: translate(-90px);
  }
  100% {
    transform: translate(85px);
  }
}

/* h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
} */
/* p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
} */

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgb(25, 248, 188) 0%, rgb(0, 2, 5) 100%);
  color:white;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:35vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
div.drop-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 200px;
  width: 200px;
}


div.drop {
  position: absolute;
  top: -50%;
  width: 100%;
  height: 100%;
  border-radius: 100% 5% 100% 100%;
  transform: rotate(-45deg);
  margin: 0px;
  background: rgb(120, 183, 250);
  animation: drip 4s forwards;
}
h1 {
  color: white;
  position: absolute;
  font-size: 2.5em;
  height: 1em;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2;
  margin: auto;
  text-align: center;
  opacity: 0;
  animation: appear 2s 2.5s forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

div.drop-container:before,
div.drop-container:after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 55%;
  right: 50%;
  transform: translate(50%) rotateX(75deg);
  border-radius: 100%;
  opacity: 0;
  width: 75%;
  height: 75%;
  border: 5px solid skyblue;
  animation: dripple 2s ease-out 1s;
}

div.drop-container:after {
  animation: dripple 2s ease-out 1.7s;
}

@keyframes drip {
  45% {
    top: 0;
    border-radius: 100% 5% 100% 100%;
    transform: rotate(-45deg);
  }
  100% {
    top: 0;
    transform: rotate(0deg);
    border-radius: 100%;
  }
}

@keyframes dripple {
  0% {
    width: 150px;
    height: 150px;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 500px;
    height: 500px;
    top: -20%;
    opacity: 0;
  }
}

</style>