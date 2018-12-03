import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Add from '@/components/Add'
import Detail from '@/components/Detail'
import Cart from '@/components/Cart'
import Wish from '@/components/Wish'
import Edit from '@/components/Edit'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add',
            name: 'Add',
            component: Add
        },
        {
            path: '/:item_slug',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/wish',
            name: 'Wish',
            component: Wish
        },
        {
            path: '/edit/:item_slug',
            name: 'Edit',
            component: Edit
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
})