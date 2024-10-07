import { createApp } from 'vue'
import { createPinia } from 'pinia'

import FooterView from "../src/components/FooterView.vue"
import MainZukunftView from '../src/components/MainZukunftView.vue'
import PreisView from "../src/components/PreisView.vue"
import DeviceLookSmart from "../src/components/DeviceLookSmart.vue"
import DeviceLookTablet from "../src/components/DeviceLookTablet.vue"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component("footer-view", FooterView)
app.component("main-zukunft", MainZukunftView)
app.component("preis-view", PreisView)
app.component("device-look-smart", DeviceLookSmart)
app.component("device-look-tablet", DeviceLookTablet)

app.use(createPinia())
app.use(router)

app.mount('#app')
