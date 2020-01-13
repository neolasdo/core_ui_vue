import Vue from 'vue'
import App from './App'
import axios from 'axios'
import auth from './services/auth'
import router from './router'
import CoreuiVue from '@coreui/vue'
import {iconsSet as icons} from './assets/icons/icons.js'

Vue.config.performance = true
Vue.use(CoreuiVue)

const token = auth.getUser()
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

new Vue({
    el: '#app',
    router,
    icons,
    template: '<App/>',
    components: {
        App
    },
})
