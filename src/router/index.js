import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/pages/NotFound'
import LogIn from '@/pages/LogIn'
import frontRoutes from './front'
import adminRoutes from './admin'

Vue.use(Router)

// concat all routes
let routes = []
routes = routes.concat(frontRoutes, adminRoutes)

// add login
routes.push({ path: '/login', component: LogIn, meta: { title: 'ETFE - 登录' } })
// add 404 notfound
routes.push({ path: '*', component: NotFound, meta: { title: 'ETFE - NotFound' } })

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
