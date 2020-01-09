import Vue from 'vue'
import Router from 'vue-router'
import auth from '../services/auth'

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

export default new Router({
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
                console.log(auth.isAuthenticated())
                return auth.isAuthenticated() ? '/admin' : '/login';
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
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                },
                {
                    path: '/admin',
                    redirect: '/admin/dashboard',
                    name: 'Backend',
                    component: TheContainer,
                    beforeEach: ifAuthenticated,
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
            ]
        },
    ]
}


const ifAuthenticated = (to, from, next) => {
    if (auth.isAuthenticated()) {
        next()
        return
    }
    next('/login')
}
