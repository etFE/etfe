import api, { setNotice } from '@/api/front'

export default {
    namespaced: true,
    state: {
        user: {
            id: '',
            username: '',
            roles: [],
        },
        isLogin: !!localStorage.getItem('token'),
    },
    mutations: {
        SET_LOGIN_MSG (state, data) {
            state.user.id = data.data._id
            state.user.username = data.data.username
            state.user.roles = data.data.roles
            state.isLogin = true

            localStorage.setItem('token', data.token)
        },
        LOG_OUT (state) {
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
    },
}
