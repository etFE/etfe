import api, { setNotice } from '@/api/front'

export default {
    namespaced: true,
    state: {
        backgroundUrl: '',
        imgMsg: {
            name: '',
            avater: '',
            link: '',
        },
    },
    mutations: {
        SET_BGMSG (state, data) {
            const { urls, user } = data
            // small regular
            state.backgroundUrl = urls
            state.imgMsg.name = user.name
            state.imgMsg.link = user.links.html
            state.imgMsg.avater = user.profile_image.medium
        },
    },
    actions: {
        async LOG_IN ({ commit, state }, user) {
            const res = await api.u.login({
                data: user,
            })
            const { data } = res

            if (data.error) {
                setNotice('error', data.message)
            } else {
                setNotice('success', data.message)
            }
        },
        async GET_BACKGROUND ({ commit, state }) {
            if (!state.backgroundUrl) {
                const res = await api.thirdParty.getBackground()
                commit('SET_BGMSG', res.data)
            }
        },
    },
}
