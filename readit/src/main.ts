import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/common.css'
import { createPinia } from 'pinia'


createApp(App).use(createPinia()).mount('#app')
