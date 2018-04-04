<template>
  <transition
    name="fade"
    mode="out-in">
    <keep-alive>
      <router-view class="content" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
    name: 'AppMain',
}
</script>

<style>

</style>
