<template>
    <div class="et-PagePlugins-container">
        <div class="et-plugins-tree">
            <plugins-list :avtiveMenu="avtiveMenu" :pluginsList="pluginsList" v-on:changeMenu="changeMenu" />
        </div>
        <transition name="fade" mode="out-in">
            <router-view v-show="isRouterShow" />
        </transition>
    </div>
</template>

<script>

import PluginsList from './PagePluginsList'

export default {
    name: 'PagePlugins',
    data () {
        return {
            avtiveMenu: '',
        }
    },
    mounted () {
        this.$store.dispatch('front/plugins/GET_LIST').then(() => {
            const pluginName = this.$route.params.name
            const hasNameInList = this.pluginsList.some(item => (item.id === pluginName))
            let currentName = ''

            // mounted 如果路径参数有，且组件列表中有，给赋予状态。否则默认给第一条
            if (pluginName && hasNameInList) {
                currentName = pluginName
            } else {
                currentName = this.pluginsList[0].id
            }
            this.setActive(currentName)
        })
    },
    components: {
        PluginsList,
    },
    computed: {
        pluginsList () {
            return this.$store.state.front.plugins.pluginsList
        },
        isRouterShow () {
            return this.$store.state.front.plugins.isRouterShow
        },
    },
    methods: {
        changeMenu (name) {
            this.avtiveMenu = name
        },
        setActive (name) {
            this.avtiveMenu = name
            this.$router.push({ path: `/plugins/${name}` })
        },
    },
    beforeRouteUpdate (to, from, next) {
        if (to.hash) {
            return
        }
        if (to.path === '/plugins') {
            this.setActive(this.pluginsList[0].id)
        }
        next()
    },
}
</script>

<style lang="scss">
.et-PagePlugins-container {
  display: flex;
}
</style>
