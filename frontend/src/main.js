import { createApp } from 'vue'
import { createPinia } from 'pinia'

import FooterView from "../src/components/FooterView.vue"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component("footer-view", FooterView)

app.use(createPinia())
app.use(router)

app.mount('#app')
