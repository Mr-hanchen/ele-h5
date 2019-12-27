import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: "index",
          component: () => import('../views/Index.vue')
        },
        {
          path: 'selectAddress',
          name: 'selectAddress',
          component: () => import('../views/SelectAddress.vue')
        },
        {
          path: 'selectCity',
          name: 'selectCity',
          component: () => import('../views/SelectCity.vue')
        }
      ]
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('../views/Find.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/Mine.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/Logout.vue')
    },
    {
      path: '/coin',
      name: 'coin',
      component: () => import('../views/Coin.vue')
    }
  ]
})

export default router
