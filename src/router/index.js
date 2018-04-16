import Vue from 'vue'
import { Message } from 'element-ui'
import Router from 'vue-router'
import NotFound from '@/pages/NotFound'
import frontRoutes from './front'
import adminRoutes from './admin'

Vue.use(Router)

// concat all routes
let routes = []
routes = routes.concat(frontRoutes, adminRoutes)

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
    const token = localStorage.getItem('token')
    // 检测是否登录 若未登录则跳转登录页
    if (to.matched[0].path === '/admin' && !token) {
        Message({
            message: '请先登录用户',
            type: 'error',
        })
        next('/')
    }
    // 动态设置title
    if (to.meta.title) {
        document.title = to.meta.title
    }

    next()
})

export default router
