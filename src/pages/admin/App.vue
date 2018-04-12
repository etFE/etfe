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
    methods: {
        // 侧边栏展开函数
        toggleSide (val) {
            this.sideBarShow = val
        },
    },
}
</script>

<style lang="scss">
@import '../../style/admin/index.scss'
</style>
