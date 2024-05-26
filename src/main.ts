import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n';
import {messages} from './language/language'; 

import App from './App.vue'
import router from './router'

const i18n = createI18n({
    legacy: false, 
    locale: 'en', 
    fallbackLocale: 'es', 
    messages, 
  });

const app = createApp(App)

app.use(createPinia())
app.use(i18n); 
app.use(router)
app.mount('#app')
