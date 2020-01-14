import Vue from 'vue'
import axios from 'axios';
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        status: 'loading',
    },
    getters: {
        token(state) {
            return state.token;
        },
        isLoggedIn(state) {
            return state.token !== '';
        },
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
            state.status = 'success';
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.token = '';
            state.status = 'error';
            localStorage.removeItem('token');
        },
    },
    actions: {
        loginServer({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({url: 'http://localhost:3000/login', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        commit('auth_success', token);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error');
                        reject(err)
                    })
            })
        },
        loginTest({commit}, user) {
            return new Promise((resolve, reject) => {
                let text = " ";
                let chars = "abcdefghijklmnopqrstuvwxyz";
                for (let i = 0; i < 13; i++) {
                    text += chars.charAt(Math.floor(Math.random() * chars.length))
                }
                let token = text.toUpperCase();
                commit('auth_success', token);
                resolve(token)
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout');

                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    },
});