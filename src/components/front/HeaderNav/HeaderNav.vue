<template>
    <i-menu
        :theme="theme"
        :active-name="avtiveMenu"
        class="et-header-container"
        mode="horizontal"
        @on-select="menuSelect"
    >
        <div class="et-header-left">
            <et-logo @logoclick="logoClick"/>
            <nav-search />
        </div>
        <menu-item name="plugins">
            <Icon type="cube"/>组件
        </menu-item>
        <menu-item name="about">
            <Icon type="radio-waves"/>关于
        </menu-item>
        <div class="et-header-right">
            <nav-avater />
        </div>
    </i-menu>
</template>

<script>

import EtLogo from '@/components/EtLogo'
import NavAvater from './HeaderNavAvater'
import NavSearch from './HeaderNavSearch'

export default {
    name: 'HeaderNav',
    components: {
        EtLogo,
        NavAvater,
        NavSearch,
    },
    data () {
        return {
            theme: 'light',
            isTransparent: '',
        }
    },
    computed: {
        avtiveMenu () {
            return this.$route.path.split('/')[1]
        },
    },
    methods: {
        menuSelect (name) {
            this.$router.push({ path: `/${name}` })
        },
        logoClick () {
            this.$router.push({ path: '/' })
        },
    },
}
</script>

<style lang='scss'>
.et-header-container {
    display: flex;
    height: 60px;
    line-height: 60px;
    padding: 0 $bodySidePadding;

    .et-header-left {
        flex: 1;
        display: flex;
    }

    .et-header-right {
        margin-left: 60px;
    }
}

</style>
