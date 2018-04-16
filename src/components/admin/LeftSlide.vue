<template>
    <div class="left-slide">
        <div
            :class="{'collageLogo': !sideBarShow}"
            class="logo"
        >
            <et-logo />
        </div>
        <div class="side-menu">
            <el-menu
                :collapse="!sideBarShow"
                :default-active="$route.path"
                router
                class="nav-menu"
                background-color="#39435c"
                text-color="#fff"
                active-text-color="#ff0"
            >
                <div
                    v-for="(item, index) in nav_menu_data"
                    :key="index"
                >
                    <el-menu-item
                        v-if="typeof item.child === 'undefined' "
                        :index="item.path"
                        class="menu-list"
                    >
                        <i
                            class="iconfont"
                            v-html="item.unicode"
                        />
                        <span
                            slot="title"
                            class="nav-text"
                        >{{ item.title }}</span>
                    </el-menu-item>
                    <el-submenu
                        v-else
                        :index="item.path"
                    >
                        <template
                            slot="title"
                            class="menu-list"
                        >
                            <i
                                class="iconfont"
                                v-html="item.unicode"
                            />
                            <span
                                slot="title"
                                class="nav-text"
                            >{{ item.title }}</span>
                        </template>
                        <el-menu-item
                            v-for="(sub_item, sub_index) in item.child"
                            :index="sub_item.path"
                            :key="sub_index"
                            class="menu-list"
                        >
                            <span
                                class="nav-text"
                                v-text="sub_item.title"
                            />
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
    name: 'LeftSlide',
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
                    title: '用户管理',
                    path: '/admin/user',
                    unicode: '&#xe66c;',
                },
                {
                    title: '权限配置',
                    path: '/admin/authority',
                    unicode: '&#xe61a;',
                    child: [
                        {
                            title: '角色管理',
                            path: '/admin/authority/role',
                        },
                        {
                            title: '角色权限分配',
                            path: '/admin/authority/test2',
                        },
                        {
                            title: '用户角色分配',
                            path: '/admin/authority/test3',
                        },
                    ],
                },
                {
                    title: '人员管理',
                    path: '/admin/peopleManage',
                    unicode: '&#xe66c;',
                },
                {
                    title: '文件管理',
                    path: '/admin/filesManage',
                    unicode: '&#xe615;',
                },
                {
                    title: '菜单管理',
                    path: '/admin/menuManage',
                    unicode: '&#xe7c0;',
                },
                {
                    title: '组件文档管理',
                    path: '/admin/apiManage',
                    unicode: '&#xe646;',
                },
                {
                    title: '日志管理',
                    path: '/admin/logsManage',
                    unicode: '&#xe62f;',
                },
                {
                    title: '系统管理',
                    path: '/admin/sysManage',
                    unicode: '&#xe672;',
                },
            ],
        }
    },
}
</script>

<style lang="scss">
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
.left-slide {
  display: flex;
  flex-direction: column;
  color: #fff;
  .logo {
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
  .side-menu {
    flex: 1;
    width: auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
