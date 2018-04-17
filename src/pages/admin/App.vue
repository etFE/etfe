<template>
    <div class="container">
        <left-slide :side-bar-show="sideBarShow"/>
        <div
            :class="{ 'hideSidebar': !sideBarShow }"
            class="right-container"
        >
            <navbar
                :side-bar-show="sideBarShow"
                @toggleSide="toggleSide"/>
            <tabs-view/>
            <app-main/>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/admin/NavBar'
import LeftSlide from '@/components/admin/LeftSlide'
import TabsView from '@/components/admin/TabsView'
import AppMain from '@/components/admin/AppMain'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        LeftSlide,
        Navbar,
        TabsView,
        AppMain,
    },
    data () {
        return {
            sideBarShow: true,
        }
    },
    computed: {
        ...mapState('global', ['isLogin']),
    },
    mounted () {
        const isLogin = this.isLogin
        const cRouterPath = this.$router.currentRoute.matched[0].path

        if (cRouterPath === '/admin' && !isLogin) {
            this.$message({
                message: '请先登录用户',
                type: 'error',
            })
            this.$router.push({ path: '/' })
        }
    },
    methods: {
        // 侧边栏展开函数
        toggleSide (val) {
            this.sideBarShow = val
        },
    },
}
</script>

<style lang="scss">
@import '../../style/admin/index.scss';
</style>
