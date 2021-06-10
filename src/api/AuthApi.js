import { saveUser, removeUser, getCurrentUser } from '../utils/LocalStorage'

class AuthApi {
    constructor(url) {
        this.api = url + '/auth';
    }

    async login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        }

        return await fetch(`${this.api}/signin`, requestOptions)
            .then(resp => {
                if (resp.data.accessToken) {
                    saveUser(JSON.stringify(resp.data))
                }
                return resp.data
            });
    }

    async register(username, email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, email: email })
        }
    
        return await fetch(`${this.api}/signup`, requestOptions)
    }

    logout() {
        removeUser()
    }

    user() {
        return getCurrentUser()
    }
}

export default AuthApi;