<template>
    <div class="ad-aside">
        <div
            :class="{'collageLogo': !sideBarShow}"
            class="ad-aside-logo">
            <et-logo />
        </div>
        <div class="ad-aside-nav">
            <el-menu
                :collapse="!sideBarShow"
                :default-active="$route.path"
                router
                class="nav-menu"
                background-color="#39435c"
                text-color="#dcdcdc"
                active-text-color="#ffeb3b">
                <div
                    v-for="(item, index) in nav_menu_data"
                    :key="index">
                    <el-menu-item
                        v-if="typeof item.child === 'undefined' "
                        :index="item.path"
                        class="menu-list">
                        <svg-icon :icon-class="item.iClass" />
                        <span
                            slot="title"
                            class="nav-text">{{ item.title }}</span>
                    </el-menu-item>
                    <el-submenu
                        v-else
                        :index="item.path">
                        <template
                            slot="title"
                            class="menu-list">
                            <svg-icon :icon-class="item.iClass" />
                            <span
                                slot="title"
                                class="nav-text">{{ item.title }}</span>
                        </template>
                        <el-menu-item
                            v-for="(sub_item, sub_index) in item.child"
                            :index="sub_item.path"
                            :key="sub_index"
                            class="menu-list">
                            <span
                                class="nav-text"
                                v-text="sub_item.title" />
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
    </div>

</template>

<script>
import EtLogo from '@/components/EtLogo'

export default {
    name: 'Aside',
    components: {
        EtLogo,
    },
    props: {
        sideBarShow: {
            type: Boolean,
            default: true,
        },
    },
    data () {
        return {
            nav_menu_data: [
                {
                    title: '系统管理',
                    path: '/admin/sysManage',
                    iClass: 'systems',
                },
                {
                    title: '菜单管理',
                    path: '/admin/menuManage',
                    iClass: 'menu',
                },
                {
                    title: '用户管理',
                    path: '/admin/user',
                    iClass: 'user',
                },
                {
                    title: '权限配置',
                    path: '/admin/authority',
                    iClass: 'permissions',
                    child: [
                        {
                            title: '角色管理',
                            path: '/admin/authority/role',
                        },
                        {
                            title: '角色权限分配',
                            path: '/admin/authority/roleMenu',
                        },
                        {
                            title: '用户角色分配',
                            path: '/admin/authority/userRole',
                        },
                    ],
                },

                {
                    title: '人员管理',
                    path: '/admin/peopleManage',
                    iClass: 'roles',
                },
                {
                    title: '文件管理',
                    path: '/admin/filesManage',
                    iClass: 'files',
                },

                {
                    title: '组件文档管理',
                    path: '/admin/apiManage',
                    iClass: 'web-api',
                },
                {
                    title: '日志管理',
                    path: '/admin/logsManage',
                    iClass: 'logs',
                },
            ],
        }
    },
}
</script>

<style lang="scss">
.ad-aside {
  display: flex;
  flex-direction: column;
  &-logo {
    height: 50px;
    padding: 10px 35px;
    box-sizing: border-box;
    &.collageLogo {
      padding: 10px;
      .et-header-logo {
        width: 36px;
      }
    }
  }
  &-nav {
    flex: 1;
    width: auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-menu {
      height: 100%;
      border: none;
      .nav-text {
        margin-left: 15px;
      }
      &:not(.el-menu--collapse) {
        width: 220px;
      }
    }
  }
}
</style>
