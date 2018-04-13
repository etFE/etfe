<template>
    <div id="app">
        <router-view/>
        <icon-svg-sprite />
    </div>
</template>

<script>
import IconSvgSprite from '@/components/IconSvgSprite'

export default {
    name: 'App',
    components: {
        IconSvgSprite,
    },
    mounted () {
        this.$store.dispatch('global/GET_USER_INFO')
    },
}
</script>

<style lang="scss">
html,
body {
    height: 100%;
}
#app {
    height: 100%;
}
</style>
