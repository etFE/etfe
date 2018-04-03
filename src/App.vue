<template>
    <div id="app">
        <router-view/>
        <icon-svg-sprite />
    </div>
</template>

<script>
import IconSvgSprite from "@/components/IconSvgSprite";

export default {
    name: "App",
    components: {
        IconSvgSprite
    }
};
</script>

<style lang="scss">

</style>
