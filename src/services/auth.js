import axios from 'axios';

export default {
    isAuthenticated() {
        if (this.getToken()) {
            return true;
        }
        return false;
    },
    loginClient(username, password) {
        let token = 'AKCGASGCIIUICKABYT3';
        localStorage.setItem('user-token', token)
    },
    removeToken() {
        localStorage.removeItem('user-token')
    },
    getToken() {
        return localStorage.getItem('user-token');
    },
    loginWithServer(user) {
        return new Promise((resolve, reject) => {
            axios({url: 'auth', data: user, method: 'POST'})
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('user-token', token)
                    resolve(resp)
                })
                .catch(err => {
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    }
}