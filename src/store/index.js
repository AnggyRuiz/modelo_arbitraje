import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        token: null,
        kUser: null,
        jobId: null,
        userData: null,
        dataTrx: null,
        typeTable: null,
        queryNum: null
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
        },
        setTypeTable(state, payload) {
            state.typeTable = payload;
        },
        setQuery(state, payload) {
            state.queryNum = payload

        }
    },
    actions: {
        async login({ commit }, user) {
            console.log(user)
            commit("setToken", user.data.token);
            commit('setUser', user.user);
            localStorage.setItem("idToken", user.data.token);
            if (user.user.stateAccount == false) {
                router.push("/changePsw");

            } else {
                router.push("/about");
            }
        },
        async searchData({ commit }, data) {
            console.log('aca data', data)
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
        async setQueryNum({ commit }, id) {
            console.log({ "idUser": id });
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/user/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "idUser": id })
                })
                const dataRes = await res.json();
                console.log(dataRes[0].queryNum);
                commit('setQuery', dataRes[0].queryNum - 1)


                return dataRes
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
        async getDataTrx({ commit }, idUser) {
            console.log({ "idUser": idUser });
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/trx/getTrx', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "idUser": idUser })
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

            console.log(data);
            try {
                const res = await fetch('https://backendmodelo.herokuapp.com/api/trx/saveTransaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataSaave = await res.json();
                console.log('data save', dataSaave.data);
                try {
                    const res = await fetch('https://backendmodelo.herokuapp.com/api/trx/getTrx', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "idUser": dataSaave.data.idUser })
                    })
                    const response = await res.json();
                    console.log(response);
                    commit('setDataTrx', response)
                    return response
                } catch (error) {
                    console.log(error);

                }




                return dataSaave
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
        },
        setTypeTable({ commit }, data) {
            commit('setTypeTable', data)
        },
        setQuery({ commit }, data) {
            commit('setQuery', data)
        }
    },
    modules: {}
})