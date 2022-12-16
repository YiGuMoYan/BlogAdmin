import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/admin',
    component: AdminView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    const login = document.cookie
    if (login.split('=')[1] === 'true') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
