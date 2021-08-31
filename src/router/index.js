import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import store from '../store'
import PruebasForm from '../views/PruebasForm.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { protectedRoute: true }
    },
    {
        path: '/PruebasForm',
        name: 'PruebasForm',
        component: PruebasForm,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isProtectedRoute = to.matched.some(item => item.meta.protectedRoute)
    if (isProtectedRoute && store.state.token === null) {
        // ruta protegida es true
        // token es nulo true, por ende redirigimos al inicio
        next('/')
    } else {
        // En caso contrario sigue...
        next()
    }
})

export default router