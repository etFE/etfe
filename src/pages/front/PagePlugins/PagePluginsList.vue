<template>
    <i-menu
        :active-name="avtiveMenu"
        @on-select="selectPlugin"
    >
        <menu-item
            v-for="plugin in pluginsList"
            :key="plugin.id"
            :name="plugin.id"
        >
            <Icon :type="icons[plugin.id]"/>
            {{ plugin.text }}
        </menu-item>
    </i-menu>
</template>

<script>

const icons = {
    etGrid: 'grid',
    etTree: 'usb',
    etDialog: 'ios-chatbubble',
    etSelect: 'ios-arrow-down',
    etDatepicker: 'calendar',
    etCheck: 'android-checkbox',
    etTab: 'social-windows',
    etValidate: 'help',
    etUpload: 'ios-cloud-upload',
    etForm: 'ios-list',
    common: 'ios-grid-view',
}

export default {
    name: 'PluginsList',
    props: {
        avtiveMenu: {
            type: String,
            required: true,
        },
        pluginsList: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            icons,
        }
    },
    methods: {
        selectPlugin (name) {
            this.$emit('changeMenu', name)
            this.$router.push({ path: `/plugins/${name}` })
        },
    },
}
</script>

<style>

</style>
