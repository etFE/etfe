const tabsView = {
    namespaced: true,
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
            const arr = state.visitedViews
            for (let i = 0, l = arr.length; i < l; i += 1) {
                if (arr[i].path === view.path) {
                    arr.splice(i, 1)
                    break
                }
            }
        },
        DEL_OTHER_VIEWS: (state, view) => {
            /* 之前的代码 若几天后无bug可删除 */
            // if (view.title !== '首页') {
            //     state.visitedViews = [{
            //         path: '/admin',
            //         title: '首页',
            //     }]
            // } else {
            //     state.visitedViews = []
            // }
            state.visitedViews = [view]
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
    getters: {
        tabViews: (state) => {
            // 修改过的代码
            const firstTab = state.visitedViews[0]
            if (!firstTab || firstTab.title !== '首页') {
                state.visitedViews.unshift({
                    path: '/admin',
                    title: '首页',
                })
            }
            /* 之前的代码 若几天后无bug可删除 */
            // if (!state.visitedViews.length) {
            //     state.visitedViews.push({
            //         path: '/admin',
            //         title: '首页',
            //     })
            // }
            return state.visitedViews
        },
    },
}

export default tabsView
