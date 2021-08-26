import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        token: null,
        kUser: null,
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setUser(state, payload) {
            state.kUser = payload
        }
    },
    actions: {
        async login({ commit }, user) {
            console.log(user)
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                const userDB = await res.json();
                console.log(userDB.data.token);
                commit('setToken', userDB.data.token);
                localStorage.setItem('idToken', userDB.data.token)
                router.push('/about');
                return userDB
            } catch (error) {
                console.log(error);

            }
        },
        getToken({ commit }) {
            if (localStorage.getItem('idToken')) {
                commit('setToken', localStorage.getItem('idToken'))
            } else {
                commit('setToken', null)
            }
        },
        logOut({ commit }) {
            localStorage.removeItem('idToken')
            commit('setToken', null)
            commit('setUser', null)
            router.push('/');
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    },
    modules: {}
})