import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('../imports/ui/pages/Auth.vue')
    },
    {
        path: '/workspace',
        name: 'workspace',
        component: () => import('../imports/ui/pages/Workspace.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../imports/ui/pages/Profile.vue')
    },
    {
        path: '*',
        name: 'not-found',
        component: () => import('../imports/ui/pages/NotFound.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
  
export default router
