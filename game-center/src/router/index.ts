import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { state } from "@/socket";
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/LandingView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  if(!state.connected && to.name !== 'home') {
    return { name: 'home' }
  }
})

export default router