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
        isShowLogin: false,
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
        SHOW_LOGIN (state) {
            state.isShowLogin = true
        },
    },
    actions: {
        async GET_BACKGROUND ({ commit, state }) {
            if (!state.backgroundUrl) {
                const res = await api.thirdParty.getBackground()
                commit('SET_BGMSG', res.data)
            }
        },
    },
}
