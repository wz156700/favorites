import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/homeView.vue'
const routes = [
    {
        path: '/',
        redirect: '/iamgeGallery'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/iamgeGallery',
        name: 'iamgeGallery',
        component: () => import("@/views/ImageGallery.vue")
    }
]
const router = createRouter(
    {
        history: createWebHashHistory(),
        routes,
    }
)

export default router