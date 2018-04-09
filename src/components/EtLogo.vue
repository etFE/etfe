<template>
    <div
        class="et-header-logo"
        @click="handleLogoClick"
    >
        <svg class="et-header-logo-icon">
            <use xlink:href="#icon-logo"/>
        </svg>
        <span class="et-header-logo-name">ETFE</span>
    </div>
</template>

<script>
export default {
    name: 'HeaderNavLogo',
    methods: {
        handleLogoClick () {
            this.$emit('logoclick')
        },
    },
}
</script>

<style lang="scss">
$logoColor: #00defa;
$lofoFont: "Comic Sans MS", "Adele", "PingFang SC";

.et-header-logo {
  font-size: 24px;
  user-select: none;
  width: 130px;
  color: $logoColor;
  height: 100%;
  cursor: pointer;

  .et-header-logo-icon {
    vertical-align: middle;
    width: 36px;
    height: 36px;
    color: $logoColor;
  }
  .et-header-logo-name {
    vertical-align: middle;
    font-family: $lofoFont;
  }
}
</style>
