import FrontApp from '@/pages/front/FrontApp'
import PageHome from '@/pages/front/PageHome/PageHome'
import PageAbout from '@/pages/front/PageAbout'
import PagePlugins from '@/pages/front/PagePlugins/PagePlugins'
import PluginsGuide from '@/pages/front/PagePlugins/PagePluginsGuide'
// import NotFound from '@/pages/front/NotFound'

const frontRoutes = [
    {
        path: '/',
        component: FrontApp,
        children: [
            { path: '', component: PageHome, meta: { title: 'ETFE - 首页' } },
            {
                path: 'plugins',
                component: PagePlugins,
                children: [
                    { path: ':name', component: PluginsGuide },
                ],
                meta: { title: 'ETFE - 组件' },
            },
            { path: 'about', component: PageAbout, meta: { title: 'ETFE - 关于' } },
            // { path: '*', component: NotFound },
        ],
    },

]

export default frontRoutes
