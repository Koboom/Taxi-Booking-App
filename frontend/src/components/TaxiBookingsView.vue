<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

export default {
    name: "Passengers",
    data() {
        return {
            passengers: [],
            drivers: [],
            name: "",
            surname: "",
            location: "",
            allBookings: []
        }
    },
    async mounted() {
        await this.updatePassengers()
        await this.updateDrivers()
    },
    computed: {
        totalBookings() {
            // Tüm yolcuların rezervasyon sayısını topla
            return this.passengers.reduce((total, passenger) => total + passenger.bookings.length, 0);
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchPassengers","addPassenger","deletePassenger","fetchDrivers"]),
        async updatePassengers() {
            this.passengers = await this.fetchPassengers()
            this.allBookings = this.passengers.reduce((bookings, passenger) => bookings.concat(passenger.bookings), [] )
        },
        async updateDrivers() {
            this.drivers = await this.fetchDrivers()
        },

        async deleteFecthPassengers(passengerId) {
            await this.deletePassenger(passengerId)
            await this.updatePassengers()
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
  <div class="w3-container">
    <p class="w3-panel w3-leftbar w3-border-green w3-pale-red w3-round-large">
              Es handelt sich um eine Demoseite.
    </p>
    <div class="w3-bar w3-black w3-large" style="z-index:4">
      <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();">
          <i class="fa fa-bars"></i> Menu
      </button>
      <span class="w3-bar-item w3-right">
      Logo
    </span>
    <!-- <a href="/signup" class="w3-bar-item w3-button" style="margin-left: 10px;">Üye Ol</a> -->
    </div>


      <nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
          <div class="w3-container w3-row">
              <div class="w3-col s4">
                  <img src="../components/icons/avatar2.png" class="w3-circle w3-margin-right" style="width:46px">
              </div>
          <div class="w3-col s8 w3-bar">
          <span>Welcome, <strong>Admin</strong></span><br>
              <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
              <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
              <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
          </div>
          </div>
  <hr>
          <div class="w3-container">
              <h5>Dashboard</h5>
          </div>
          <div class="w3-bar-block">
            <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
            <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-users fa-fw"></i>  Overview</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-eye fa-fw"></i>  Views</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Traffic</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bullseye fa-fw"></i>  Geo</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-diamond fa-fw"></i>  Orders</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bell fa-fw"></i>  News</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bank fa-fw"></i>  General</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-history fa-fw"></i>  History</a>
            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>  Settings</a><br><br>
          </div>
      </nav>
      <!-- Overlay effect when opening sidebar on small screens -->
      <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>
      <div class="w3-main" style="margin-left:300px;margin-top:43px;">

<!-- Header -->
      <header class="w3-container" style="padding-top:22px">
        <h5><b><i class="fa fa-dashboard"></i> Meine Dashboard</b></h5>
      </header>

      <div class="w3-row-padding w3-margin-bottom">
        <div class="w3-quarter">
          <a href="/passengers" class="" style="text-decoration: none;">
              <div class="w3-container w3-red w3-padding-16">
            <div class="w3-left"><i class="fa fa-comment w3-xxxlarge"></i></div>
            <div class="w3-right">
              <h3>{{ passengers.length }}</h3>
            </div>
            <div class="w3-clear"></div>
            <h4>Anzahl der Kunden</h4>
          </div>
          </a>
        </div>
        <div class="w3-quarter">
         <a href="/drivers" style="text-decoration: none;">
          <div class="w3-container w3-blue w3-padding-16">
            <div class="w3-left"><i class="fa fa-eye w3-xxxlarge"></i></div>
            <div class="w3-right">
              <h3>{{ drivers.length }}</h3>
            </div>
            <div class="w3-clear"></div>
            <h4>Anzahl der Fahrer</h4>
          </div>
         </a>
        </div>
        <div class="w3-quarter">
          <!-- <a href="/passengernew" style="text-decoration: none;"> -->
          <a href="#" style="text-decoration: none;">
            <div class="w3-container w3-teal w3-padding-16">
            <div class="w3-left"><i class="fa fa-share-alt w3-xxxlarge"></i></div>
            <div class="w3-right">
              <h3>23</h3>
            </div>
            <div class="w3-clear"></div>
            <h4>Kunden Hinzufügen</h4>
          </div>
          </a>
        </div>
        <div class="w3-quarter">
          <a href="/taxiAllbookings" style="text-decoration: none;">
            <div class="w3-container w3-orange w3-text-white w3-padding-16" style="text-decoration: none;">
            <div class="w3-left"><i class="fa fa-users w3-xxxlarge"></i></div>
            <div class="w3-right">
              <h3>{{ totalBookings }}</h3>
            </div>
            <div class="w3-clear"></div>
            <h4>Anzahl der Bestellungen</h4>
          </div>
          </a>
        </div>
      </div>

      <div class="w3-panel">
        <div class="w3-row-padding" style="margin:0 -16px">
          <div class="w3-third">
            <h5>Regions</h5>
            <img src="../components/icons/region.jpg" style="width:100%" alt="Google Regional Map">
          </div>
          <div class="w3-twothird">
            <h5>Feeds</h5>
            <table class="w3-table w3-striped w3-white">
              <tbody>
                <tr>
                  <td><i class="fa fa-user w3-text-blue w3-large"></i></td>
                  <td>New record, over 90 views.</td>
                  <td><i>10 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-bell w3-text-red w3-large"></i></td>
                  <td>Database error.</td>
                  <td><i>15 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-users w3-text-yellow w3-large"></i></td>
                  <td>New record, over 40 users.</td>
                  <td><i>17 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-comment w3-text-red w3-large"></i></td>
                  <td>New comments.</td>
                  <td><i>25 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-bookmark w3-text-blue w3-large"></i></td>
                  <td>Check transactions.</td>
                  <td><i>28 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-laptop w3-text-red w3-large"></i></td>
                  <td>CPU overload.</td>
                  <td><i>35 mins</i></td>
                </tr>
                <tr>
                  <td><i class="fa fa-share-alt w3-text-green w3-large"></i></td>
                  <td>New shares.</td>
                  <td><i>39 mins</i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr>
      <div class="w3-container">
        <h5>General Stats</h5>
        <p>New Visitors</p>
        <div class="w3-grey">
          <div class="w3-container w3-center w3-padding w3-green" style="width:25%">+25%</div>
        </div>

        <p>New Users</p>
        <div class="w3-grey">
          <div class="w3-container w3-center w3-padding w3-orange" style="width:50%">50%</div>
        </div>

        <p>Bounce Rate</p>
        <div class="w3-grey">
          <div class="w3-container w3-center w3-padding w3-red" style="width:75%">75%</div>
        </div>
      </div>
      <hr>

      <div class="w3-container">
        <h5>Countries</h5>
        <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
          <thead>
            <tr>
              <th>Country</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>United States</td>
              <td>65%</td>
            </tr>
            <tr>
              <td>UK</td>
              <td>15.7%</td>
            </tr>
            <tr>
              <td>Russia</td>
              <td>5.6%</td>
            </tr>
            <tr>
              <td>Spain</td>
              <td>2.1%</td>
            </tr>
            <tr>
              <td>India</td>
              <td>1.9%</td>
            </tr>
            <tr>
              <td>France</td>
              <td>1.5%</td>
            </tr>
          </tbody>
        </table><br>
        <button class="w3-button w3-dark-grey">More Countries  <i class="fa fa-arrow-right"></i></button>
      </div>
      <hr>
      <div class="w3-container">
        <h5>Recent Users</h5>
        <ul class="w3-ul w3-card-4 w3-white">
          <li class="w3-padding-16">
            <img src="../components/icons/avatar2.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
            <span class="w3-xlarge">Mike</span><br>
          </li>
          <li class="w3-padding-16">
            <img src="../components/icons/avatar5.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
            <span class="w3-xlarge">Jill</span><br>
          </li>
          <li class="w3-padding-16">
            <img src="../components/icons/avatar6.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
            <span class="w3-xlarge">Jane</span><br>
          </li>
        </ul>
      </div>
      <hr>

      <div class="w3-container">
        <h5>Recent Comments</h5>
        <div class="w3-row">
          <div class="w3-col m2 text-center">
            <img class="w3-circle" src="../components/icons/avatar3.png" style="width:96px;height:96px">
          </div>
          <div class="w3-col m10 w3-container">
            <h4>John <span class="w3-opacity w3-medium">Sep 29, 2014, 9:12 PM</span></h4>
            <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br>
          </div>
        </div>

        <div class="w3-row">
          <div class="w3-col m2 text-center">
            <img class="w3-circle" src="../components/icons/avatar1.png" style="width:96px;height:96px">
          </div>
          <div class="w3-col m10 w3-container">
            <h4>Bo <span class="w3-opacity w3-medium">Sep 28, 2014, 10:15 PM</span></h4>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br>
          </div>
        </div>
      </div>
      <br>
      <div class="w3-container w3-dark-grey w3-padding-32">
        <div class="w3-row">
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar w3-border-green">Demographic</h5>
            <p>Language</p>
            <p>Country</p>
            <p>City</p>
          </div>
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar w3-border-red">System</h5>
            <p>Browser</p>
            <p>OS</p>
            <p>More</p>
          </div>
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar w3-border-orange">Target</h5>
            <p>Users</p>
            <p>Active</p>
            <p>Geo</p>
            <p>Interests</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="w3-container w3-padding-16 w3-light-grey w3-center">
        <h4>FOOTER</h4>
        <p>Entwickelt von <a href="https://yukselsoftware.de/" target="_blank">Yüksel</a></p>
      </footer>

<!-- End page content -->
</div>

  </div>
  <!-- <div class="w3-container">
      <p>Total number of bookings: {{ totalBookings }}</p>
      <h2>Passengers Page</h2>
      <p>There are {{ passengers.length }} passengers.</p>
      <ol>
          <li v-for="passenger in passengers" :key="passenger._id">
              <a class="w3-button" :href="`/passengers/${passenger._id}`">{{ passenger.name }} {{ passenger.surname }}</a>
              <button @click="deleteFecthPassengers(passenger._id)">Delete</button>
          </li>
      </ol>
  </div>
  <h2>New Passenger</h2>
  <div class="w3-container">
      <p>
          <label for="name">Name:</label>
          <input class="w3-input" type="text" id="name" v-model="name" placeholder="Enter name...">
      </p>
      <p>
          <label for="surname">Surname:</label>
          <input class="w3-input" type="text" id="surname" v-model="surname" placeholder="Enter surname...">
      </p>
      <p>
          <label for="location">Location:</label>
          <input class="w3-input" type="text" id="location" v-model="location" placeholder="Enter location...">
      </p>
      <button @click="addNewPassenger">Add Passenger</button>
  </div> -->
</template>

<style></style>
