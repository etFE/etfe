<template>
  <ul class="et-pluginsdemo-container">
    <li
      class="et-demo-item"
      v-for="(item, index) in demosData"
      :key="index"
    >
      <iframe
        class="et-demo-iframe"
        frameborder="0"
        scrolling="no"
        ref="iframe"
        :height="item.curHeight"
        :src="item.url"
      ></iframe>
      <div
        class="et-demo-more"
        v-show="item.height > 280"
        @click="() => { showMore(index) }"
      >
        <Icon class="et-demomore-arrow" :type="item.isMore ? 'ios-arrow-up' : 'ios-arrow-down'" />
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'GuideFrame',
  props: {
    demo: Array,
  },
  data () {
    return {
      spinShow: true,
    }
  },
  computed: {
    demosData () {
      return this.demo
    },
  },
  watch: {
    $route () {
      this.spinShow = true
    },
    demosData () {
      setTimeout(() => {
        // TODO:这里关闭时机优化
        this.spinShow = false
      }, 10)
    },
  },
  methods: {
    showMore (index) {
      this.$store.commit('front/plugins/SHOW_MORE', index)
    },
  },
}
</script>

<style lang="scss">
.et-pluginsdemo-container {
  list-style: none;
}
.et-demo-item {
  position: relative;
  border: 1px solid $borderColor;
  border-radius: 5px;
  @include transition;
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    border-color: transparent;
    @include transition;
  }
}
.et-demo-iframe {
  display: block;
  width: 100%;
  @include transition;
}
.et-demo-more {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 30px;
  box-sizing: border-box;
  padding: 5px 30% 5px 0;
  line-height: 30px;
  text-align: right;
  cursor: pointer;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    box-shadow: inset 0 -15px 30px #fdfdfd;
  }
}
.et-demomore-arrow {
  z-index: 10;
  position: relative;
}
</style>
