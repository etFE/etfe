<template>
    <section class="tabs-container">
        <div class="tabs-wrapper" ref="tabsWrapper" @wheel.prevent="handleScroll">
            <ul class="tabsList" ref="tabsList" :style="{left: left + 'px'}">
                <router-link
                    class="tab-item"
                    v-for=" tab in tabViews"
                    :class=" isActive(tab)? 'item-select':'' "
                    :key="tab.path"
                    :to="tab.path"
                    tag="li"
                    @click="isActive"
                    @contextmenu.prevent.native="showMenu(tab, $event)"
                > {{ tab.title }}
                    <i class="el-icon-close" @click.prevent.stop='closeSelectedTab(tab)'></i>
                </router-link>
            </ul>
        </div>
        <ul class="tabs-menu" v-show="visible" :style="{left: menuLeft + 'px', top: top + 'px'}">
            <li class="menu-item" @click="closeSelectedTab(selectTab)">关闭自己</li>
            <li class="menu-item" @click="closeOtherTabs()">关闭其他</li>
            <li class="menu-item" @click="closeAllTabs()">关闭所有</li>
        </ul>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TabsView',
    data () {
        return {
            left: 0,
            menuLeft: 0,
            top: 0,
            visible: false,
            selectTab: {},
        }
    },
    mounted () {
        const route = this.generateRoute(this.$route)
        this.addVisitedViews(route)
    },
    watch: {
        $route () {
            const route = this.generateRoute(this.$route)
            this.addVisitedViews(route)
        },
        visible (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
    },
    computed: {
        ...mapGetters(['tabViews']),
    },
    methods: {
        ...mapActions([
            'addVisitedViews',
            'delVisitedViews',
            'delOtherViews',
            'delAllViews',
        ]),
        handleScroll (evt) {
            const eventDelta = evt.wheelDelta
            const $containerWidth = this.$refs.tabsWrapper.offsetWidth
            const $tabsListWidth = this.$refs.tabsList.offsetWidth
            this.left += eventDelta
            if (this.left > 0) {
                this.left = 0
            } else {
                // 页签总宽度大于外部容器宽度时，left值重新计算
                if ($tabsListWidth > $containerWidth) {
                    if ($tabsListWidth + this.left < $containerWidth) {
                        this.left = $containerWidth - $tabsListWidth
                    }
                    // 小于总宽度时 left为0
                } else {
                    this.left = 0
                }
            }
        },
        isActive (tab) {
            return tab.path === this.$route.path
        },
        generateRoute (route) {
            /* if (route.name) {
              return route;
            } */
            return route
        },
        closeSelectedTab (tab) {
            if (tab.path === '/admin') {
                return false
            }
            this.delVisitedViews(tab).then((views) => {
                if (this.isActive(tab)) {
                    const latestView = views.slice(-1)[0]
                    if (latestView) {
                        this.$router.push(latestView.path)
                    } else {
                        this.$router.push('/admin')
                    }
                }
            })
        },
        closeOtherTabs () {
            this.delOtherViews(this.selectTab).then((tab) => {
                this.$router.push(tab.path)
            })
        },
        closeAllTabs () {
            this.delAllViews().then(() => {
                this.$router.push('/admin')
                this.isActive(this.tabViews)
            })
        },
        showMenu (tab, evt) {
            this.menuLeft = evt.clientX - 220
            this.top = evt.clientY
            this.visible = true
            this.selectTab = tab
        },
        closeMenu () {
            this.visible = false
        },
    },
}
</script>

<style lang="scss">
.tabs-container {
  height: 38px;
  background: #fff;
  .tabs-wrapper {
    position: relative;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    box-shadow: 1px 2px 7px -1px #e4e3e3;
    .tabsList {
      position: absolute;
      height: 100%;
      white-space: nowrap;
      .tab-item {
        display: inline-block;
        margin-left: 5px;
        padding: 0 8px;
        transition: all 0.3s;
        height: 24px;
        line-height: 24px;
        font-size: 13px;
        letter-spacing: 2px;
        cursor: pointer;
        border: 1px solid #e0e0e0;
        // &:first-child {
        //   margin-left: 15px;
        // }
        .el-icon-close:hover {
          border-radius: 100%;
          display: inline-block;
          width: 15px;
          height: 15px;
          background: #ccc;
        }
        &:hover {
          background: rgba(66, 185, 131, 0.7);
          color: #fff;
        }
        &.item-select {
          background: #42b983;
          color: #fff;
        }
      }
    }
  }

  .tabs-menu {
    position: absolute;
    z-index: 22222;
    padding: 5px 0;
    width: 100px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 1px 2px 5px #909399;
    .menu-item {
      padding: 5px 10px;
      font-size: 14px;
      color: #606266;
      cursor: pointer;
      outline: 0;
      &:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>
