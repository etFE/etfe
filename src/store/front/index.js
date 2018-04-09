import plugins from './modules/plugins'
import glogbal from './modules/global'
import home from './modules/home'

export default {
    namespaced: true,
    modules: {
        plugins,
        glogbal,
        home,
    },
}
