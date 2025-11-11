import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/deposits',
      name: 'deposits',
      component: () => import('../views/DepositsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/DepositView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/withdrawals',
      name: 'withdrawals',
      component: () => import('../views/WithdrawalsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('../views/WithdrawView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkouts',
      name: 'checkouts',
      component: () => import('../views/CheckoutsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout/:id',
      name: 'checkout-detail',
      component: () => import('../views/CheckoutDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout/public/:id',
      name: 'checkout-public',
      component: () => import('../views/CheckoutPublicView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/affiliate-market',
      name: 'affiliate-market',
      component: () => import('../views/AffiliateMarketView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/referrals',
      name: 'referrals',
      component: () => import('../views/ReferralsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/integrations',
      name: 'integrations',
      component: () => import('../views/IntegrationsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:userId/:productId',
      name: 'product-public',
      component: () => import('../views/ProductPublicView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.initialized) {
    await authStore.initializeAuth()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Redirect authenticated users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }
  
  next()
})

export default router
