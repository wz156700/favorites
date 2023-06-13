import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/common.css'
import { createPinia } from 'pinia'
import router from '@/router/index.js'


createApp(App).use(createPinia()).use(router).mount('#app')
