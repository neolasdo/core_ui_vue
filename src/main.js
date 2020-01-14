import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuex from 'vuex';
import account from './services/account'
import router from './router'
import CoreuiVue from '@coreui/vue'
import {iconsSet as icons} from './assets/icons/icons.js'

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(Vuex);

// const store = new Vuex.Store({
//     modules: {
//         account: account,
//     }
// })

const token = account.getters.token;

if (token) {
    axios.defaults.headers.common['Authorization'] = token
} else {
    delete axios.defaults.headers.common['Authorization'];
}

new Vue({
    el: '#app',
    store: account,
    router,
    icons,
    template: '<App/>',
    components: {
        App
    },
})
