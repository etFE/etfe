<template>
    <div class="et-PagePlugins-container">
        <div class="et-plugins-tree">
            <plugins-list
                :plugins-list="pluginsList"
                :avtive-menu="avtiveMenu"
                @:changeMenu="changeMenu"
            />
        </div>
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view v-show="isRouterShow" />
        </transition>
    </div>
</template>

<script>

import PluginsList from './PagePluginsList'

export default {
    name: 'PagePlugins',
    components: {
        PluginsList,
    },
    data () {
        return {
            avtiveMenu: '',
        }
    },
    computed: {
        pluginsList () {
            return this.$store.state.front.plugins.pluginsList
        },
        isRouterShow () {
            return this.$store.state.front.plugins.isRouterShow
        },
    },
    mounted () {
        this.$store.dispatch('front/plugins/GET_LIST').then(() => {
            const { name } = this.$route.params
            this.setActive(name)
        })
    },
    methods: {
        changeMenu (name) {
            this.avtiveMenu = name
        },
        setActive (name) {
            this.avtiveMenu = name || this.pluginsList[0].id
            if (!name) {
                this.$router.push({ path: `/plugins/${this.pluginsList[0].id}` })
            }
        },
    },
    beforeRouteUpdate (to, from, next) {
        if (to.hash) {
            return
        }
        this.setActive(to.params.name)
        next()
    },
}
</script>

<style lang="scss">
.et-PagePlugins-container {
  display: flex;
}
</style>
