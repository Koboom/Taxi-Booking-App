<template>
    <div class="w3-container w3-margin">
        <p class="w3-panel w3-leftbar w3-border-green w3-pale-red w3-round-large w3-padding">
            Es handelt sich um eine Demoseite.
        </p>
        <hr>
        <div class="w3-container">
            <p class="w3-green w3-round-xlarge w3-margin w3-padding-large w3-center">Kasse Total: {{ getPayTotalPrice().toFixed(2) }}</p>
        </div>
        <div class="w3-container w3-half w3-round-xlarge" style="background-color: green; border-radius: 80% 20% / 10% 90%;">
            <form action="" v-on:submit.prevent="addItem" class="w3-container w3-margin w3-padding" style="color: bisque;">
                <div>
                    <h4>Table Number: {{ tableNumber }}</h4>
                    <input type="number" v-model="tableNumber" placeholder="Enter table number" required>
                </div>
                <div>
                    <h4>Order here: </h4>
                    <input type="radio" required value="Dinner" v-model="itemType"> Dinner<br>
                    <input type="radio" required value="Drink" v-model="itemType"> Drink<br>
                    <input type="radio" required value="Dessert" v-model="itemType"> Dessert<br>
                </div>
                <p v-show="itemType">
                    <label>
                      <select required v-model="itemName" v-on:change="newUrl">
                        <option value="" selected disabled>Select item</option>
                        <option v-for="item in preDefItems" v-bind:value="item.name" v-show="item.type===itemType">
                          {{ item.name }} - {{ item.price }} - {{ item.deliveryTime }}
                        </option>
                      </select>
                    </label>
                </p>
                <img v-bind:src="itemUrl" style="width: 70px;">
                <p v-show="itemName">
                    <input type="number" placeholder="How many?" v-model="itemNumber" required>
                </p>
                <button type="submit" class="w3-button w3-black w3-round-large w3-hover-red w3-margin w3-padding">Order</button>
            </form>
        </div>
        <div class="w3-container w3-half" style="background-color: whitesmoke;">
            <h4>Your order: </h4>

            <ul class="w3-ul w3-margin w3-padding">
                <li v-if="order.length > 0" class="w3-light-green w3-round">
                    <span style="background-color: lightgreen; padding: 5px; border-radius: 5px"> Total Price: {{ getTotalPrice().toFixed(2) }}</span>
                    <span class="w3-padding"> Total Items: {{ order.length }}</span>
                    <button class="w3-green w3-button w3-round-large w3-hover-red w3-margin w3-padding " @click="disOn = !disOn">Warenkorb</button>
                </li>
            </ul>
            <ul class="w3-ul w3-margin w3-padding">
                <li v-for="(item, index) in order" class="w3-light-green w3-round" :key="index">
                    <span style="background-color: lightgreen; padding: 5px; border-radius: 5px"> {{ item.number }} {{ item.name }} </span>
                    <span class="w3-padding"><img v-bind:src="item.url"  style="width: 70px;"></span>
                    <span> Price: {{ item.price }} ,</span>
                    <span> Delivery Time: {{ item.deliveryTime }}</span>
                    <button @click="cancelItem(index)" class="w3-button w3-red w3-small" style="margin-left: 10px;">Cancel</button>
                </li>
            </ul>
        </div>
    </div>
    <div v-show="disOn" >
            <div class="w3-display-middle w3-half">
                <div class="w3-animate-top">
                    <header class="w3-container w3-green w3-half">
                        <span class="w3-button w3-display-topright w3-xlarge w3-hover-red" @click="disOn = !disOn">&times;</span>
                        <h2>Payment</h2>
                        <p>Total Price: {{ getTotalPrice().toFixed(2) }}</p>
                        <p>Total Items: {{ order.length }}</p>
                        <p>Change: {{ amount - getTotalPrice().toFixed(2)}}</p>
                        <p>Kasse Total: {{ getPayTotalPrice().toFixed(2) }}</p>
                    </header>
                    <header class="w3-container w3-orange w3-half">
                        <button class="w3-button w3-green w3-round-large w3-hover-red w3-margin w3-padding" @click="pay">Pay</button>
                    </header>
                    <div class="w3-container w3-orange w3-padding">
                        <p>Calculation: </p>
                        <input type="number" placeholder="Amount" v-model="amount"  @keydown.enter="amount">
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableNumber: "", // Masa numarası veri öğesi
            itemType: "",
            itemName: "",
            itemUrl: "",
            itemNumber: "",
            preDefItems: [
                { name: 'Burrito', type: 'Dinner', imgUrl: '../src/components/icons/img_burrito.svg', price: 10.99, deliveryTime: "20 minutes" },
                { name: 'Pizza', type: 'Dinner', imgUrl: '../src/components/icons/img_pizza.svg', price: 12.99, deliveryTime: "20 minutes"  },
                { name: 'Pho Soup', type: 'Dinner', imgUrl: '../src/components/icons/img_soup.svg', price: 8.99, deliveryTime: "20 minutes" },
                { name: 'Spaghetti', type: 'Dinner', imgUrl: '../src/components/icons/img_spaghetti.svg', price: 10.99, deliveryTime: "20 minutes" },
                { name: 'Fish', type: 'Dinner', imgUrl: '../src/components/icons/img_fish.svg', price: 15.99, deliveryTime: "20 minutes" },
                { name: 'Cake', type: 'Dessert', imgUrl: '../src/components/icons/img_cake.svg', price: 5.99, deliveryTime: "20 minutes" },
                { name: 'Rice', type: 'Dinner', imgUrl: '../src/components/icons/img_rice.svg', price: 7.99, deliveryTime: "20 minutes" },
                { name: 'Salad', type: 'Dinner', imgUrl: '../src/components/icons/img_salad.svg', price: 9.99 , deliveryTime: "10 minutes"},
                { name: 'Coke', type: 'Drink', imgUrl: '../src/components/icons/img_soda.svg', price: 2.99 , deliveryTime: "10 minutes"},
                { name: 'Green Soda', type: 'Drink', imgUrl: '../src/components/icons/img_greenSoda.svg', price: 2.99, deliveryTime: "10 minutes" },
                { name: 'Doughnut', type: 'Dessert', imgUrl: '../src/components/icons/img_doughnut.svg', price: 3.99, deliveryTime: "10 minutes" },
                { name: 'Ice Cream', type: 'Dessert', imgUrl: '../src/components/icons/img_iceCream.svg', price: 4.99 , deliveryTime: "10 minutes"},
                { name: 'Lemonade', type: 'Drink', imgUrl: '../src/components/icons/img_lemonade.svg', price: 2.99 , deliveryTime: "10 minutes"},
                { name: 'Pancakes', type: 'Dessert', imgUrl: '../src/components/icons/img_pancakes.svg', price: 4.99, deliveryTime: "10 minutes" },
                { name: 'Water', type: 'Drink', imgUrl: '../src/components/icons/img_water.svg', price: 1.99, deliveryTime: "10 minutes" }
            ],
            order: [],
            payTotal: [],
            disOn: false,
            amount: 0,
            tableNumbers: [] // Masa numarası veri öğesi
        };
    },
    methods: {
        addItem() {
            if (!this.itemName || !this.itemUrl || !this.itemNumber || !this.tableNumber) {
                alert("Please fill out all fields");
                return;
            }
            const selectedItem = this.preDefItems.find(item => item.name === this.itemName);
            if (selectedItem) {
                let item = {
                    name: this.itemName,
                    number: this.itemNumber,
                    url: this.itemUrl,
                    price: selectedItem.price,
                    deliveryTime: selectedItem.deliveryTime,
                    tableNumber: this.tableNumber // Masa numarası eklendi
                };
                this.order.push(item);
                this.tableNumbers.push(this.tableNumber)
                this.resetForm();
            }
        },
        resetForm() {
            this.itemType ="";
            this.itemName ="";
            this.itemUrl ="";
            this.itemNumber ="";
        },
        newUrl(e) {
            const selectedItem = this.preDefItems.find(item => item.name === e.target.value);
            if (selectedItem) {
                this.itemUrl = selectedItem.imgUrl;
            }
        },
        getTotalPrice() {
            return this.order.reduce((total, item) => total + item.price * item.number, 0);
        },
        cancelItem(index) {
            this.order.splice(index, 1);
        },
        pay() {
            this.payTotal.push(this.getTotalPrice());
            this.resetForm()
            this.disOn = false
            this.order.length = 0;
            this.amount = 0;
            this.tableNumber = "";
        },
        getPayTotalPrice() {
            return this.payTotal.reduce((total, item) => total + item, 0);
        }
    }
};
</script>

<style scoped>
/* Burada gerekirse stil tanımlamaları yapılabilir */
</style>
