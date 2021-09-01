import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        token: null,
        kUser: null,
        jobId: null,
        userData: null,
        dataTrx: null
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setUser(state, payload) {
            state.kUser = payload
        },
        setJobId(state, payload) {
            state.jobId = payload
        },
        setUserData(state, payload) {
            state.userData = payload
        },
        setDataTrx(state, payload) {
            state.dataTrx = payload
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
        async searchData({ commit }, data) {
            console.log(data)
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/launch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataLaunch = await res.json();
                console.log(dataLaunch);
                commit('setUserData', dataLaunch)
                return dataLaunch
            } catch (error) {
                console.log(error);

            }

        },
        async getReport({ commit }, id) {
            console.log(id);
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(id)
                })
                const dataLaunch = await res.json();
                console.log(dataLaunch);
                return dataLaunch
            } catch (error) {
                console.log(error);

            }

        },
        async getResult({ commit }, jobkey) {
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/result', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jobkey)
                })
                const dataLaunch = await res.json();
                console.log(dataLaunch);
                console.log(dataLaunch.id);
                commit('setJobId', dataLaunch.id);
                return dataLaunch
            } catch (error) {
                console.log(error);

            }
        },
        async getDataTrx({ commit }) {
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/trx/getTrx', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const response = await res.json();
                console.log(response);
                commit('setDataTrx', response)
                return response
            } catch (error) {
                console.log(error);

            }
        },
        async saveData({ commit }, data) {
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/trx/saveTransaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataLaunch = await res.json();
                console.log(dataLaunch);
                return dataLaunch
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
            commit('setUserData', null)

            router.push('/');
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    },
    modules: {}
})