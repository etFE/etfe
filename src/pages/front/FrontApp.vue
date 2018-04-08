<template>
    <div id="front-app">
        <header-nav />
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view class="et-router-view"/>
        </transition>
        <footer-copyright />
        <icon-svg-sprite />
        <BackTop/>
    </div>
</template>

<script>
import HeaderNav from '@/components/front/HeaderNav/HeaderNav'
import FooterCopyright from '@/components/front/FooterCopyright'
import IconSvgSprite from '@/components/IconSvgSprite'

export default {
    name: 'FrontApp',
    components: {
        HeaderNav,
        FooterCopyright,
        IconSvgSprite,
    },
}
</script>

<style lang="scss">
@import url("../../style/front/index.scss");

html,
body {
  height: 100%;
}

#front-app {
  background: $appBgColor;
  height: 100%;
}
.et-router-view {
  background: $themeBg;
  margin-top: $blockMargin;
}
</style>
