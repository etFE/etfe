<template>
    <i-menu
        id="et-header-container"
        :theme="theme"
        :active-name="avtiveMenu"
        mode="horizontal"
        @on-select="menuSelect"
    >
        <div class="et-header-left">
            <et-logo @logoclick="logoClick"/>
        </div>
        <menu-item name="plugins">
            <Icon type="cube"/>组件
        </menu-item>
        <menu-item name="about">
            <Icon type="radio-waves"/>关于
        </menu-item>
        <div class="et-header-right">
            <header-nav-avater />
        </div>
    </i-menu>
</template>

<script>

import EtLogo from '@/components/EtLogo'
import HeaderNavAvater from './HeaderNavAvater'

export default {
    name: 'HeaderNav',
    components: {
        EtLogo,
        HeaderNavAvater,
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
#et-header-container {
    display: flex;
    height: 60px;
    line-height: 60px;
    padding: 0 $bodySidePadding;

    .et-header-left {
        flex: 1;
    }

    .et-header-right {
        margin-left: 60px;
    }
}

</style>
