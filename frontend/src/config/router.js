import Vue from 'vue'
import VueRouter from 'vue-router'


import {userKey} from '@/global'
import Home from '../components/home/Dashboard'
import AdminPages from '../components/admin/AdminPages'
import MapStrategy from '../components/map/MapStrategy'
import ObjectivesByPerspectives from '../components/objective/ObjectivesByPerspectives'
import ObjectiveById from '../components/objective/ObjectiveById'
import Auth from '../components/auth/Auth'
Vue.use(VueRouter)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages,
        meta: {requiresAdmin: true}
    },
    {
        name:'mapStrategy',
        path: '/map',
        component: MapStrategy
    },
    {
        name:'objectivesBYperspectives',
        path: '/objectives/:id/perspectives',
        component: ObjectivesByPerspectives
    },
    {
        name: 'ObjectiveById',
        path: '/objectives/:id',
        component: ObjectiveById
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]

const router = new VueRouter ({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next () : next({path: '/'})
    } else {
        next()
    }

}) 

export default router