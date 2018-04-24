<template>
    <svg
        class="svg-icon"
        aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
export default {
    name: 'IconSvg',
    props: {
        iconClass: {
            type: String,
            required: true,
        },
    },
    computed: {
        iconName () {
            return `#icon-${this.iconClass}`
        },
    },
}
</script>

<style scoped>
.svg-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  fill: darkgray;
  overflow: hidden;
}
</style>
