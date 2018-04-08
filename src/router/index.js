import Vue from 'vue'
import Router from 'vue-router'

import frontRoutes from './front'
import adminRoutes from './admin'

Vue.use(Router)

// 连接所有路由
let routes = []
routes = routes.concat(frontRoutes, adminRoutes)

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // if (to.hash) {
        //   return {
        //     selector: to.hash,
        //   }
        // }
        if (savedPosition) {
            return savedPosition
        }
        return { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    // 动态设置title
    if (to.meta.title) {
        document.title = to.meta.title
    }

    next()
})

export default router
