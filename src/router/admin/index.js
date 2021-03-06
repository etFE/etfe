// home
import homeComponent from '@/pages/admin/home'
// view page warp component
import viewPageComponent from '@/pages/admin/App'

import userComponent from '@/pages/admin/users'

import authorComponent from '@/pages/admin/authority'

import roleComponent from '@/pages/admin/authority/roles'

import roleMenuComponent from '@/pages/admin/authority/roleMenu'

import userRoleComponent from '@/pages/admin/authority/userRole'

import peopleMangeComponent from '@/pages/admin/peoples'

import filesManageComponent from '@/pages/admin/files'

import menuManageComponent from '@/pages/admin/menu'

import logsManageComponent from '@/pages/admin/logs'

import sysManageComponent from '@/pages/admin/sys'

import personInfoComponent from '@/pages/admin/personInfo'

import apiManageComponent from '@/pages/admin/apiComponent'


// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style

// NProgress.configure({
//   showSpinner: false
// }) // NProgress Configuration

const adminRoutes = [
    {
        path: '/admin',
        component: viewPageComponent,
        meta: { title: '首页' },
        children: [
            {
                path: '/',
                name: 'admin',
                component: homeComponent,
            },
            {
                path: 'user',
                name: 'user',
                component:
                    userComponent,
                meta: { title: '用户管理' },
            },
            {
                path: 'authority',
                name: 'authority',
                redirect: 'authority/role',
                component: authorComponent,
                meta: { title: '权限管理' },
                children: [
                    {
                        path: 'role',
                        component: roleComponent,
                        meta: { title: '角色管理' },
                    },
                    {
                        path: 'roleMenu',
                        component: roleMenuComponent,
                        meta: { title: '角色权限分配' },
                    },
                    {
                        path: 'userRole',
                        component: userRoleComponent,
                        meta: { title: '用户角色分配' },
                    },
                ],
            },
            {
                path: 'peopleManage',
                name: 'peopleManage',
                component: peopleMangeComponent,
                meta: { title: '人员管理' },
            },
            {
                path: 'filesManage',
                name: 'filesManage',
                component: filesManageComponent,
                meta: { title: '文件管理' },
            },
            {
                path: 'menuManage',
                name: 'menuManage',
                component: menuManageComponent,
                meta: { title: '菜单管理' },
            },
            {
                path: 'apiManage',
                name: 'apiManage',
                component: apiManageComponent,
                meta: { title: '组件文档管理' },
            },
            {
                path: 'person',
                name: 'person',
                component: personInfoComponent,
                meta: { title: '个人信息' },
            },
            {
                path: 'logsManage',
                name: 'logsManage',
                component: logsManageComponent,
                meta: { title: '日志管理' },
            },
            {
                path: 'sysManage',
                name: 'sysManage',
                component: sysManageComponent,
                meta: { title: '系统管理' },
            },
        ],
    },
]

export default adminRoutes
