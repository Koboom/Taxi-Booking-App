import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FooterView from "../src/components/FooterView.vue";
import MainZukunftView from '../src/components/MainZukunftView.vue';
import PreisView from "../src/components/PreisView.vue";
import DeviceLookSmart from "../src/components/DeviceLookSmart.vue";
import DeviceLookTablet from "../src/components/DeviceLookTablet.vue"
import App from './App.vue';
import router from './router';
import { io } from "socket.io-client"; // socket.io-client içe aktarıldı

// Socket.io bağlantısını başlat
const socket = io('https://backend-fimqwb2tta-ez.a.run.app', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://yukselsoftware.de/"
  }
}); // Düzeltilmiş URL

const app = createApp(App);
app.config.globalProperties.$socket = socket; // Socket'i tüm uygulamaya global olarak ekle

// Componentleri tanımlayın
app.component("footer-view", FooterView);
app.component("main-zukunft", MainZukunftView);
app.component("preis-view", PreisView);
app.component("device-look-smart", DeviceLookSmart);
app.component("device-look-tablet", DeviceLookTablet);

app.use(createPinia());
app.use(router);

app.mount('#app');

// Socket bağlantısı kontrol etmek için:
socket.on('connect', () => {
  console.log("Socket connected:", socket.id);
});
