<template>
    <transition
        name="fade"
        mode="out-in"
    >
        <keep-alive :include="cachedViews">
            <router-view class="content" />
        </keep-alive>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AppMain',
    computed: {
        ...mapGetters('admin/tabsView', ['cachedViews']),
    },
}
</script>

<style>

</style>
