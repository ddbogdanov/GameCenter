import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { state } from "@/socket";
import LandingView from '../views/LandingView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('../views/LobbyView.vue')
  },
  {
    path: '/chess',
    name: 'chess',
    component: () => import('../views/ChessView.vue')
  },
  {
    path: '/crashcoin',
    name: 'crashcoin',
    component: () => import('../views/CrashCoinView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if(!state.connected && to.name !== 'landing') {
    return { name: 'landing' }
  }
})

export default router