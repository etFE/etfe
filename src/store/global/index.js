import api, { setNotice } from '@/api/front'

export default {
    namespaced: true,
    state: {
        user: {
            id: '',
            nick: '',
            username: '',
            password: '',
            avatar: '',
            roles: [],
        },
        isLogin: !!localStorage.getItem('token'),
    },
    mutations: {
        SET_LOGIN_MSG (state, data) {
            Object.assign(state.user, data.data)
            state.isLogin = true

            if (data.token) {
                localStorage.setItem('token', data.token)
            }
        },
        LOG_OUT (state) {
            state.user = {}
            state.isLogin = false
            localStorage.removeItem('token')
        },
    },
    actions: {
        async LOG_IN ({ commit, state }, user) {
            const res = await api.u.login({
                data: user,
            })
            const { data } = res

            if (!data.error) {
                setNotice('success', data.message)
                commit('SET_LOGIN_MSG', data)
            }
            return res
        },
        async GET_USER_INFO ({ commit }) {
            const token = localStorage.getItem('token')
            if (token) {
                const res = await api.u.getUserInfo()

                if (!res.data.error) {
                    commit('SET_LOGIN_MSG', res.data)
                }
            }
        },
    },
}
