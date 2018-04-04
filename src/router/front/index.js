import FrontApp from '@/pages/front/FrontApp'
import PageHome from '@/pages/front/PageHome'
import PageAbout from '@/pages/front/PageAbout'
import PagePlugins from '@/pages/front/PagePlugins/PagePlugins'
import PluginsGuide from '@/pages/front/PagePlugins/PagePluginsGuide'
// import NotFound from '@/pages/front/NotFound'

const frontRoutes = [
    {
        path: '/',
        component: FrontApp,
        children: [
            { path: '', component: PageHome },
            {
                path: 'plugins',
                component: PagePlugins,
                children: [
                    { path: ':name', component: PluginsGuide },
                ],
            },
            { path: 'about', component: PageAbout },
            // { path: '*', component: NotFound },
        ],
    },

]

export default frontRoutes
