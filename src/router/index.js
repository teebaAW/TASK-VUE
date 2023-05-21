import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuotePrint from '../views/QuotePrint.vue'
import QuotationList from '../views/QuotationList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quote',
      name: 'quote',
      component: () => import('../views/QuotePrint.vue')
    },
    {
      path: '/quotation-list',
      name: 'quotation-list',
      component: QuotationList
    }
  ]
})

export default router
