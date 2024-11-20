import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Booking from '@/components/Booking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
    },
    {
      path: '/events',
      name: 'events',
      component: HomeView,
    },
  ],
})

export default router
