const getters = {
    sideBarShow: state => state.app.sideBarShow,
    tabViews: (state) => {
        if (!state.tabsView.visitedViews.length) {
            state.tabsView.visitedViews.push({
                path: '/admin',
                title: '首页',
            })
        }
        return state.tabsView.visitedViews
    },
}

export default getters
