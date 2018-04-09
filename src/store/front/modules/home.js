import api from '@/api/front'

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
        async GET_BACKGROUND ({ commit, state }) {
            if (!state.backgroundUrl) {
                const res = await api.thirdParty.getBackground()
                commit('SET_BGMSG', res.data)
            }
        },
    },
}
