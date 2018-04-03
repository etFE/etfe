<template>
  <div class="et-home-container">
    <h1>ETFE</h1>
    <div class="et-home-search">
      <Select
        filterable
        remote
        placeholder="搜索组件..."
        :remote-method="remoteMethod"
        :loading="isLoading"
        @on-change="onSearchChange"
      >
        <Option
          v-for="(option, index) in options"
          :value="option.value"
          :key="index"
        >
          {{ option.label }}
        </Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      isLoading: false,
      options: [],
      pluginsList: [],
    }
  },
  methods: {
    remoteMethod (query) {
      if (query) {
        if (this.pluginsList.length > 0) {
          this.filterOptions(this.pluginsList, query)
        } else {
          this.isLoading = true
          this.$store.dispatch('plugins/GET_LIST').then(() => {
            this.isLoading = false
            this.pluginsList = this.$store.state.plugins.pluginsList
            this.filterOptions(this.pluginsList, query)
          })
        }
      } else {
        this.options = []
      }
    },
    filterOptions (data, query) {
      const options = data.map(item => ({
        value: item.id,
        label: item.text,
      }))

      this.options = options.filter(item => (
        item.label.toLowerCase().replace(/\s/g, '')
          .indexOf(query.toLowerCase().replace(/\s/g, '')) > -1
      ))
    },
    onSearchChange (value) {
      this.$router.push({ path: `/plugins/${value}` })
    },
  },
}
</script>

<style lang="scss">
.et-home-container {
  box-sizing: border-box;
  margin-top: 0;
  padding-top: 50px;

  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 60px;
  z-index: 0;
  overflow: hidden;

  h1 {
    font-size: 80px;
    text-align: center;
    font-weight: 400;
    color: #fff;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include filterBlur;
    margin: -10px;
    background: url('../../assets/img/home-bg.webp') 0 / cover no-repeat;
    z-index: -1;
  }
}
.et-home-search {
  width: 300px;
  margin: 30px auto;
}
</style>
