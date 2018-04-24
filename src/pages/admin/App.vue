<template>
    <div class="ad-container">
        <Aside :side-bar-show="sideBarShow"/>
        <div
            :class="{ 'hideSidebar': !sideBarShow }"
            class="ad-container-right"
        >
            <Header
                :side-bar-show="sideBarShow"
                @toggleSide="toggleSide"/>
            <!-- <Tabs/> -->
            <right-container/>
        </div>
    </div>
</template>

<script>
import Header from '@/components/admin/Header'
import Aside from '@/components/admin/Aside'
import Tabs from '@/components/admin/Tabs'
import RightContainer from '@/components/admin/RightContainer'
import { mapState } from 'vuex'
import '@/icons' // icon 加载图床

export default {
    name: 'Home',
    components: {
        Aside,
        Header,
        Tabs,
        RightContainer,
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
