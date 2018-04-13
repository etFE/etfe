<template>
    <div class="container">
        <left-slide />
        <div
            :class="{ 'hideSidebar': !sideBarShow }"
            class="right-container"
        >
            <navbar/>
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
import { mapGetters } from 'vuex'

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
            isShow: true,
        }
    },
    computed: {
        ...mapGetters(['sideBarShow']),
    },
    mounted () {
        console.log(this)
    },
    methods: {
        showSide (isShow) { // 侧边栏展开函数
            this.isShow = isShow
        },
    },
}
</script>

<style lang="scss">
@import '../../style/admin/index.scss';
</style>
