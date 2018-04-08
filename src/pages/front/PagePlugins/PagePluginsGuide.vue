<template>
    <div class="et-pluginguide-container">
        <article class="et-plugin-article">
            <h1>{{ pluginsGuide.title }}</h1>

            <h2 class="et-anchor">概述
                <a
                    href="#overview"
                    name="overview"
                >#</a>
            </h2>
            <p>{{ pluginsGuide.description }}</p>

            <h2 class="et-anchor">代码示例
                <a
                    href="#demo"
                    name="demo"
                >#</a>
            </h2>

            <guide-frame :demo="pluginsGuide.demo" />
            <div v-if="pluginsGuide.demo && pluginsGuide.demo.length === 0">待续...</div>

            <h2 class="et-anchor">API
                <a
                    href="#api"
                    name="api"
                >#</a>
            </h2>

            <h3 class="et-anchor">props
                <a
                    href="#props"
                    name="props"
                >#</a>
            </h3>
            <h3 class="et-anchor">event
                <a
                    href="#event"
                    name="event"
                >#</a>
            </h3>
            <h3 class="et-anchor">methods
                <a
                    href="#methods"
                    name="methods"
                >#</a>
            </h3>
        </article>
        <div class="et-plugin-article-side">
            <guide-catalogue />
        </div>
    </div>
</template>

<script>
import GuideFrame from './PagePluginsGuideFrame'
import GuideCatalogue from './PagePluginsGuideCatalogue'

export default {
    name: 'PluginsGuide',
    components: {
        GuideFrame,
        GuideCatalogue,
    },
    data () {
        return {
        }
    },
    computed: {
        pluginsGuide () {
            return this.$store.state.front.plugins.pluginsGuide
        },
    },
    mounted () {
        this.dispatchPluginGuide()
    },
    methods: {
        dispatchPluginGuide (name) {
            const pluginName = name || this.$route.params.name
            return new Promise((resolve) => {
                this.$store.dispatch('front/plugins/PLUGIN_GUIDE', pluginName).then(() => {
                    resolve()
                })
            })
        },
    },
    beforeRouteUpdate (to, from, next) {
        this.dispatchPluginGuide(to.params.name).then(() => {
            next()
        })
    },
}
</script>

<style lang="scss">
$anchorColor: #2d8cf0;

.et-pluginguide-container {
  padding: $blockMargin;
  width: 100%;
  display: flex;
}
.et-plugin-article {
  flex: 1;

  h1 {
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
    margin: 10px 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    margin: 8px 0;
  }

  p {
    margin: 5px;
    font-size: 14px;
  }

  // 锚点样式
  .et-anchor {
    a {
      opacity: 0;
      font-size: 24px;
      transition: opacity 0.2s ease-in-out;
      margin-left: 5px;
      position: relative;
      top: 2px;
      color: $anchorColor;
    }

    &:hover {
      a {
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
      }
    }
  }
}
.et-plugin-article-side {
  width: 120px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
</style>
