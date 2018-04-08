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
            <Icon :type="plugin.icon"/>
            {{ plugin.text }}
        </menu-item>
    </i-menu>
</template>

<script>
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
