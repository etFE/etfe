import * as api from '../../../api/front'

export default {
  namespaced: true,
  state: {
    pluginsList: [],
    pluginsGuide: {},
    isRouterShow: false,
  },
  mutations: {
    SHOW_MORE (state, index) {
      const { height, isMore } = state.pluginsGuide.demo[index]

      state.pluginsGuide.demo.splice(index, 1, {
        ...state.pluginsGuide.demo[index],
        curHeight: isMore ? 300 : height + 20,
        isMore: !isMore,
      })
    },

    PLUGIN_LIST (state, list) {
      state.pluginsList = list
    },
    PLUGIN_GUIDE (state, thePluginGuide) {
      thePluginGuide.demo.forEach((item) => {
        item.curHeight = item.height > 300 ? 300 : item.height + 20
        item.isMore = false
      })
      state.pluginsGuide = thePluginGuide
    },
    CHANGE_ROUTER (state, isShow) {
      state.isRouterShow = isShow
    },
  },
  actions: {
    async GET_LIST ({ commit, state }) {
      if (state.pluginsList.length === 0) {
        const res = await api.plugin.getList()
        commit('PLUGIN_LIST', res.data.data)
      }
    },
    async PLUGIN_GUIDE ({ commit }, name) {
      commit('CHANGE_ROUTER', false)
      const res = await api.guide.getList({
        param: { name },
      })
      commit('PLUGIN_GUIDE', res.data.data)
      commit('CHANGE_ROUTER', true)
    },
  },
}
