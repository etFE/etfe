<template>
    <div class="et-pluginguide-container">
        <article class="et-plugin-article">
            <h1>{{ pluginsGuide.title }}</h1>

            <h2 class="et-anchor">
                {{ catalogues[0].title }}
                <a
                    :href="`#${catalogues[0].name}`"
                    :name="catalogues[0].name"
                >#</a>
            </h2>
            <p>{{ pluginsGuide.description }}</p>

            <h2 class="et-anchor">
                {{ catalogues[1].title }}
                <a
                    :href="`#${catalogues[1].name}`"
                    :name="catalogues[1].name"
                >#</a>
            </h2>

            <guide-frame :demo="pluginsGuide.demo" />

            <h2 class="et-anchor">
                {{ catalogues[2].title }}
                <a
                    :href="`#${catalogues[2].name}`"
                    :name="catalogues[2].name"
                >#</a>
            </h2>
            <guide-api :api="pluginsGuide.api"/>
            <!-- <h3 class="et-anchor">
                {{ catalogues[2].second[0].title }}
                <a
                    :href="`#${catalogues[2].second[0].name}`"
                    :name="catalogues[2].second[0].name"
                >#</a>
            </h3>
            <h3 class="et-anchor">
                {{ catalogues[2].second[1].title }}
                <a
                    :href="`#${catalogues[2].second[1].name}`"
                    :name="catalogues[2].second[1].name"
                >#</a>
            </h3>
            <h3 class="et-anchor">
                {{ catalogues[2].second[2].title }}
                <a
                    :href="`#${catalogues[2].second[2].name}`"
                    :name="catalogues[2].second[2].name"
                >#</a>
            </h3> -->
        </article>
        <div class="et-plugin-article-side">
            <guide-catalogue :catalogues="catalogues"/>
        </div>
    </div>
</template>

<script>
import GuideFrame from './PagePluginsGuideFrame'
import GuideApi from './PagePluginsGuideApi'
import GuideCatalogue from './PagePluginsGuideCatalogue'

// 锚链接
const catalogues = [
    { title: '概述', name: 'overview' },
    { title: '代码示例', name: 'demo' },
    {
        title: 'API',
        name: 'api',
        // second: [
        //     { title: 'props', name: 'props' },
        //     { title: 'event', name: 'event' },
        //     { title: 'methods', name: 'methods' },
        // ],
    },
]

export default {
    name: 'PluginsGuide',
    components: {
        GuideFrame,
        GuideApi,
        GuideCatalogue,
    },
    data () {
        return {
            catalogues,
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
