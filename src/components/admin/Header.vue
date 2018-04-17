<template>
    <section class="ad-header">
        <div class="ad-header-left">
            <a
                :class="{'actived':sideBarShow}"
                class="hamburger"
                @click="toggleSideBar">
                <i class="iconfont">&#xe604;</i>
            </a>
        </div>
        <div class="ad-header-middle">
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                class="breadcrumb">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item
                        v-for="breItem in BreadcrumbList"
                        :key="breItem.path"
                        :to="{ path: breItem.path }"> {{ breItem.meta.title }} </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="ad-header-right">
            <el-tooltip
                effect="dark"
                content="全屏">
                <a
                    class="screenfull"
                    @click="toggleFull">
                    <i class="iconfont">&#xe600;</i>
                </a>
            </el-tooltip>
            <a class="username">{{ username }}</a>

            <el-dropdown
                trigger="click"
                @command="loginOut">
                <span>
                    <img
                        :src="avatar"
                        class="userimg">
                </span>
                <el-dropdown-menu
                    slot="dropdown"
                    class="dropdown-menu"
                >
                    <router-link to="/admin/person">
                        <el-dropdown-item>
                            个人信息
                        </el-dropdown-item>
                    </router-link>
                    <!-- <el-dropdown-item>设置</el-dropdown-item> -->
                    <router-link to="/">
                        <el-dropdown-item command="out">
                            安全退出
                        </el-dropdown-item>
                    </router-link>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import screenfull from 'screenfull'
import defaultImg from '@/assets/img/avater-male.jpg'

export default {
    name: 'Header',
    props: {
        sideBarShow: {
            type: Boolean,
            default: true,
        },
    },
    data () {
        return {
            hamActive: true,
            title: '后台管理系统',
            // user: '测试',
            BreadcrumbList: [],
        }
    },
    computed: {
        ...mapState('global', {
            username: state => state.user.username,
            avatar: (state) => {
                if (!state.user.avatar) {
                    state.user.avatar = defaultImg
                }
                return state.user.avatar
            },
        }),
    },
    watch: {
        $route () {
            this.getBreadcrumb()
        },
    },
    mounted () {
        this.getBreadcrumb()
    },
    methods: {
        loginOut (command) {
            if (command === 'out') {
                this.$store.commit('global/LOG_OUT')
                this.$store.commit('front/home/SHOW_LOGIN')
            }
        },
        toggleSideBar () {
            this.$emit('toggleSide', !this.sideBarShow)
        },
        getBreadcrumb () {
            const BreadcrumbList = this.$route.matched
            this.BreadcrumbList = BreadcrumbList
        },
        toggleFull () {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning',
                })
                return false
            }
            screenfull.toggle()
            return true
        },
    },
}
</script>

<style lang="scss">
$navFontSize: 16px;

.ad-header {
  position: relative;
  display: flex;
  height: 50px;
  font-size: $navFontSize;
  &-middle {
    flex: 1;
    display: inline-block;
    padding: 0 20px;
    height: 100%;
    line-height: 50px;
    .breadcrumb {
      height: 100%;
      line-height: 50px;
      font-family: "Hiragino Sans GB";
    }
  }
  &-left {
    margin-left: 10px;
    height: 100%;
    line-height: 50px;
    .hamburger {
      display: inline-block;
      cursor: pointer;
      transform: rotate(90deg);
      transition: 0.38s;
      transform-origin: 50% 50%;
    }
    .actived {
      transform: rotate(0deg);
    }
  }
  &-right {
    margin-right: 20px;
    height: 100%;
    .dropdown-menu {
      width: 200px !important;
    }
    .screenfull {
      display: inline-block;
      padding: 0 10px;
      vertical-align: middle;
      cursor: pointer;
    }
    .username {
      padding: 10px;
      height: 100%;
      line-height: 50px;
    }
    .userimg {
      display: inline-block;
      height: 40px;
      width: 40px;
      cursor: pointer;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid #ddd;
    }
  }
}
</style>
