// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import ElementUI from 'element-ui'
import VueMoment from 'vue-moment'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import createStore from './store'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(ElementUI)
Vue.use(VueMoment)
// 加载条
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   next()
// })
// router.afterEach(() => {
//   iView.LoadingBar.finish()
// })

const store = createStore()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
})
