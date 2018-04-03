const app = {
    state: {
        sideBarShow: true,
    },
    mutations: {
        TOGGLE_SIDEBAR: (state) => {
            state.sideBarShow = !state.sideBarShow
        },
    },
    actions: {
        toggleSideBar ({
            commit,
        }) {
            commit('TOGGLE_SIDEBAR')
        },
    },
}

export default app
