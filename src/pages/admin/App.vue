<template>
  <div class="container">
    <left-slide  />
    <div class="right-container" :class="{ 'hideSidebar': !sideBarShow }">
      <navbar></navbar>
      <tabs-view></tabs-view>
      <app-main></app-main>
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
    name: 'home',
    data () {
      return {
        isShow:true
      }
    },
    components: {
      LeftSlide,
      Navbar,
      TabsView,
      AppMain
    },
    methods: {
      showSide (isShow) {        // 侧边栏展开函数
        this.isShow = isShow
      }
    },
    computed: {
      ...mapGetters(['sideBarShow']),
    },
    methods: {

    }
  }
</script>

<style lang="scss">
@import '../../style/admin/index.scss'
</style>
