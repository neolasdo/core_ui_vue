import axios from 'axios';

export default {
    isAuthenticated() {
        if (this.getUser()) {
            return true;
        }
        return false;
    },
    loginClient(username, password) {
        let user = {
            username: username,
            password: password
        };
        localStorage.setItem('user', JSON.stringify(user))
    },
    removeUser() {
        localStorage.removeItem('user')
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },
    loginWithServer(user) {
        return new Promise((resolve, reject) => {
            axios({url: 'localhost:8080/auth', data: user, method: 'POST'})
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