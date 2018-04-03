const tabsView = {
    state: {
        visitedViews: [],
    },
    mutations: {
        ADD_VISITED_VIEWS: (state, view) => {
            const isExit = state.visitedViews.some(item => item.path === view.path)
            if (!isExit) {
                state.visitedViews.push({
                    title: view.meta.title,
                    path: view.path,
                    name: view.name,
                })
            }
        },
        DEL_VISITED_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }
        },
        DEL_OTHER_VIEWS: (state, view) => {
            if (view.title !== '首页') {
                state.visitedViews = [{
                    path: '/admin',
                    title: '首页',
                }]
            } else {
                state.visitedViews = []
            }
            state.visitedViews.push(view)
        },
        DEL_ALL_VIEWS: (state) => {
            state.visitedViews = []
        },
    },
    actions: {
        addVisitedViews ({ commit }, view) {
            commit('ADD_VISITED_VIEWS', view)
        },
        delVisitedViews ({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delOtherViews ({ commit }, view) {
            return new Promise((resolve) => {
                commit('DEL_OTHER_VIEWS', view)
                resolve(view)
            })
        },
        delAllViews ({ commit }) {
            return new Promise((resolve) => {
                commit('DEL_ALL_VIEWS')
                resolve()
            })
        },
    },
}

export default tabsView
