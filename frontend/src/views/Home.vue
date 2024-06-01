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
        ...mapActions(useCounterStore, ["fetchPassengers","addPassenger"]),
        async updatePassengers() {
            this.passengers = await this.fetchPassengers()
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), [] )
        },
        async addNewPassenger() {
            await this.addPassenger({
                name: this.name,
                surname: this.surname,
                location: this.location
            })
            this.name=""
            this.surname=""
            this.location=""
            await this.updatePassengers()
        }
    }
}
</script>

<template>
    <header class="w3-container w3-display-container w3-light-grey w3-padding-16 bgimg">
        <div class="w3-display-left w3-text-white w3-container">
            <span class="w3-xxlarge w3-text- w3-hide-small w3-hide-medium w3-animate-left">Beginnen Sie etwas, das wichtig ist</span><br>
            <span class="w3-large w3-hide-large w3-animate-left ">Beginnen Sie etwas, das wichtig ist</span><br>
            <span class="w3-large w3-animate-left w3-hide-small">Verschwenden Sie keine wertvolle Zeit mehr mit Projekten,</span><br>
            <span class="w3-animate-left w3-small w3-hide-large w3-hide-medium">Verschwenden Sie keine wertvolle Zeit mehr mit Projekten,</span><br>
            <span class="w3-large w3-animate-left w3-hide-small w3-hide-medium">die nicht zu Ihnen passen.</span>
            <span class="w3-animate-left w3-hide-large">die nicht zu Ihnen passen.</span>

            <p><a href="/work" class="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Learn more and start today</a></p>
        </div>
        <div class="w3-display-bottomleft w3-text-grey w3-large" style="padding: 24px 48px;">
            <a class="w3-xxlarge" target="_blank" href="https://twitter.com/mehmetykselkoy1"> <i class="fa fa-twitter w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" target="_blank" href="https://github.com/Koboom?tab=repositories"> <i class="fa fa-github w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" target="_blank" href="https://www.linkedin.com/in/mehmet-y%C3%BCksel-koyuno%C4%9Flu-7b327423b/"><i class="fa fa-linkedin w3-hover-opacity w3-text-green"></i></a>
            <a class="w3-xxlarge" target="_blank" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcRzCpPMrwbglBzzndrPPqJjJsJCKDfNqfsNcmTBgBTFHhtRWbLWSZBTmwsXxvPPSVZzdqFDs"><i class="fa fa-envelope fa-fw w3-hover-opacity w3-text-green"></i></a>
        </div>
    </header>
    <div class="w3-container" style="padding: 128px 16px; background-color: #ddd; color: #222;">
        <h3 class="w3-center">ABOUT THE COMPANY</h3>
        <p class="w3-center w3-large">Hauptmerkmale unseres Unternehmens</p>
        <div class="w3-row-padding w3-center" style="margin-top: 64px;">
            <div class="w3-quarter">
                <i class="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
                <p class="w3-large">Responsive</p>
                <p>Entwerfen für das beste Erlebnis für alle Benutzer</p>
                <p>Webseiten können auf vielen verschiedenen Geräten angezeigt werden:
                    Desktops, Tablets und Telefone. Ihre Webseite sollte unabhängig vom Gerät gut aussehen und einfach zu bedienen sein.
                </p>
            </div>
            <div class="w3-quarter">
                <i class="fa fa-heart w3-margin-bottom w3-jumbo w3-center"></i>
                <p class="w3-large">Hingabe und Leidenschaft</p>
                <p>Einer gefühlten Berufung.</p>
            </div>
            <div class="w3-quarter">
                <i class="fa fa-diamond w3-margin-bottom w3-jumbo w3-center"></i>
                <p class="w3-large">Design</p>
                <p>Ich erstelle Ihnen individuelle Webseite nach den neuesten Standards.</p>
            </div>
            <div class="w3-quarter">
                <i class="fa fa-cog w3-margin-bottom w3-jumbo w3-center"></i>
                <p class="w3-large">SEO</p>
                <p>Startleitfaden zur Suchmaschinenoptimierung</p>
                <p>Dieser Leitfaden ist für dich, wenn du Inhaber von Online Inhalten bist oder solche verwaltest,
                    mit ihnen Einnahmen erzielst oder sie über die Google Suche bewirbst.
                </p>
            </div>
        </div>
    </div>
    <div class="w3-container w3-padding-64 w3-dark-grey w3-center">
    <h1 class="w3-jumbo"><b>Features</b></h1>
    <p>Einfach Zukunft</p>

    <div class="w3-row" style="margin-top:64px">
      <div class="w3-col s3">
      <i class="fa fa-bolt w3-text-orange w3-jumbo"></i>
      <p>Fast</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-heart w3-text-red w3-jumbo"></i>
      <p>Loved</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-camera w3-text-yellow w3-jumbo"></i>
      <p>Clarity</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-battery-full w3-text-green w3-jumbo"></i>
      <p>Power</p>
    </div>
  </div>

  <div class="w3-row" style="margin-top:64px">
    <div class="w3-col s3">
      <i class="fa fa-diamond w3-text-white w3-jumbo"></i>
      <p>Sharp</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-cloud w3-text-blue w3-jumbo"></i>
      <p>Cloud</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-globe w3-text-amber w3-jumbo"></i>
      <p>Global</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-hdd-o w3-text-cyan w3-jumbo"></i>
      <p>Storage</p>
    </div>
  </div>

  <div class="w3-row" style="margin-top:64px">
    <div class="w3-col s3">
      <i class="fa fa-user w3-text-sand w3-jumbo"></i>
      <p>Safe</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-shield w3-text-orange w3-jumbo"></i>
      <p>Stabile</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-wifi w3-text-grey w3-jumbo"></i>
      <p>Connected</p>
    </div>
    <div class="w3-col s3">
      <i class="fa fa-image w3-text-pink w3-jumbo"></i>
      <p>HD</p>
    </div>
  </div>
 </div>
 <div class="">
     <footer-view ></footer-view>
  </div>
</template>

<style>
    .bgimg {
        background-image: url('../components/icons/work-2598577_1920.jpg');
        background-position: center;
        min-height: 100%;
        width: 100%;
        height: 650px;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>
