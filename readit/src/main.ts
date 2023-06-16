import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css' // 统一浏览器差异
import '@/assets/common.css'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
//引入图片预览
import preview from 'vue3-image-preview';

createApp(App).use(createPinia()).use(router).use(preview).mount('#app')
