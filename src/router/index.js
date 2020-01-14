import Vue from 'vue'
import Router from 'vue-router'
import account from '../services/account'
// Containers
import TheContainer from '../containers/TheContainer'
import Dashboard from '../views/Dashboard'
import Page404 from '../views/pages/Page404'
import Page500 from '../views/pages/Page500'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import Users from '../views/users/Users'
import User from '../views/users/User'

Vue.use(Router)

let router = new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: '/',
            redirect() {
                return !account.getters.isLoggedIn ? '/login' : '/admin';
            },
            name: 'Home',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404,
                    meta: {
                        guest: true
                    }
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500,
                    meta: {
                        guest: true
                    }
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login,
                    meta: {
                        guest: true
                    }
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register,
                    meta: {
                        guest: true
                    }
                },
                {
                    path: '/admin',
                    redirect: '/admin/dashboard',
                    name: 'Backend',
                    component: TheContainer,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: 'dashboard',
                            name: 'Dashboard',
                            component: Dashboard
                        },
                        {
                            path: 'users',
                            meta: {label: 'Users'},
                            component: {
                                render(c) {
                                    return c('router-view')
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    component: Users,
                                },
                                {
                                    path: ':id',
                                    meta: {label: 'User Details'},
                                    name: 'User',
                                    component: User,
                                },
                            ]
                        },
                    ]
                }
            ],
        },
    ]
}

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!account.getters.isLoggedIn) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(!account.getters.isLoggedIn){
            next()
        }
        else{
            next({ name: 'Backend'})
        }
    }else {
        next()
    }
})

export default router;