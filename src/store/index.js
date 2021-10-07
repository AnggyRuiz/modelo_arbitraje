import { createStore } from 'vuex'
import router from '../router'
//Produccion
//const url = "https://backendmodelo.herokuapp.com/api"
//pruebas
const url = "http://localhost:3333/api"
export default createStore({
    state: {
        token: null,
        kUser: null,
        jobId: null,
        userData: null,
        dataTrx: null,
        typeTable: 'CC',
        queryNum: null,
        numNit: null,
        typeLoad: null,
        idTable: null,
        htmlPdf: null,
        cantConsul: null
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
        },
        setNumNit(state, payload) {
            state.numNit = payload
        },
        setTypeLoad(state, payload) {
            state.typeLoad = payload
        },
        setIdTable(state, payload) {
            state.idTable = payload
        },
        setHtmlPdf(state, payload) {
            state.htmlPdf = payload
        },
        setCantConsul(state, payload) {
            state.cantConsul = payload
        }
    },
    actions: {
        async login({ commit }, user) {
            commit("setToken", user.data.token);
            commit('setUser', user.user);
            localStorage.setItem("idToken", user.data.token);
            if (user.user.stateAccount == false) {
                router.push("/changePsw");

            } else {
                router.push("/Dashboard");
            }
        },
        async searchData({ commit }, data) {
            commit('setUserData', null)
            commit('setNumNit', null)
            console.log('aca dataaAAA', data.doc)
            commit('setNumNit', data.doc)
            try {
                const res = await fetch(`${url}/launch`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataLaunch = await res.json();
                console.log(dataLaunch);
                commit('setUserData', dataLaunch)
                commit('setCantConsul', )
                return dataLaunch
            } catch (error) {
                console.log(error)

            }

        },
        async setQueryNum({ commit }, id) {
            console.log({ "idUser": id });
            try {
                const res = await fetch(`${url}/user/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "idUser": id })
                })
                const dataRes = await res.json();
                commit('setQuery', dataRes[0].queryNum)

            } catch (error) {
                console.log(err)

            }
        },

        async getReport({ commit }, id) {

            try {
                const res = await fetch(`${url}/report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "id": id }),

                })

                const rs = await res.text()
                console.log(rs);
                let nuevaVentana = window.open('', "NuevaVentana", "");
                nuevaVentana.document.write(rs);
                console.log("click en finalizar");
                commit('setUserData', null)
                commit('setNumNit', null)
            } catch (err) {
                console.log(err);
            }


        },
        async getReportNit({ commit }, id) {

            try {
                const res = await fetch(`${url}/report_nit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "id": id }),

                })

                const rs = await res.text()
                console.log(rs);
                let nuevaVentana = window.open('', "NuevaVentana", "");
                nuevaVentana.document.write(rs);
                console.log("click en finalizar");
                commit('setUserData', null)
                commit('setNumNit', null)
            } catch (err) {
                console.log(err);
            }


        },

        async getReport2({ commit }, id) {
            commit('setUserData', null)
            commit('setNumNit', null)
                (id);
            try {
                const res = await fetch(`${url}/report2`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "id": id }),

                })

                const rs = await res.text()
                let nuevaVentana = window.open("", "NuevaVentana", "");
                nuevaVentana.document.write(rs);
                nuevaVentana.print(); //para enviar a la cola de impresión
            } catch (err) {
                console.log(err);
            }


        },

        async getResult({ commit }, jobkey) {
            try {
                const res = await fetch(`${url}/result`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jobkey)
                })
                const dataLaunch = await res.json();
                return dataLaunch
            } catch (error) {
                console.log(err)

            }
        },
        async getDataTrx({ commit }, idUser) {
            try {
                const res = await fetch(`${url}/trx/getTrx`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "idUser": idUser })
                })
                const response = await res.json();
                commit('setDataTrx', response)
                return response
            } catch (error) {
                console.log(err)

            }
        },
        async saveData({ commit }, data) {
            try {
                const res = await fetch(`${url}/trx/saveTransaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataSaave = await res.json();
                ('data save', dataSaave.data);
                try {
                    const res = await fetch(`${url}/trx/getTrx`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "idUser": dataSaave.data.idUser })
                    })
                    const response = await res.json();
                    commit('setDataTrx', response)

                    return response
                } catch (error) {
                    console.log(err)

                }




                return dataSaave
            } catch (error) {
                console.log(err)

            }
        },
        async getRetry({ commit }, data) {

            try {
                const res = await fetch(`${url}/retry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                const dataLaunch = await res.json();
                commit('setUserData', dataLaunch)
                return dataLaunch
            } catch (error) {
                console.log(err)

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
        },
        setJobId({ commit }, data) {
            commit('setJobId', data)
        },
        setUserData({ commit }, data) {
            commit('setUserData', data)
        },
        setTypeLoad({ commit }, data) {
            commit('setTypeLoad', data)
        },
        setIdTable({ commit }, data) {
            commit("setIdTable", data)
        },
        setCantConsul({ commit }, data) {
            commit('setCantConsul', data)
        }

    },
    modules: {}
})