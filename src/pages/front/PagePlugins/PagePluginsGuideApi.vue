<template>
    <div>
        <div v-if="isShowTable">
            <h3 class="et-anchor">
                {{ catalogues[0].title }}
                <a
                    :href="`#${catalogues[0].name}`"
                    :name="catalogues[0].name"
                >#</a>
            </h3>
            <Table
                :columns="propsColumns"
                :data="api.props"
                border
            />
            <h3 class="et-anchor">
                {{ catalogues[1].title }}
                <a
                    :href="`#${catalogues[1].name}`"
                    :name="catalogues[1].name"
                >#</a>
            </h3>
            <Table
                :columns="eventsColumns"
                :data="api.events"
                border
            />
            <h3 class="et-anchor">
                {{ catalogues[2].title }}
                <a
                    :href="`#${catalogues[2].name}`"
                    :name="catalogues[2].name"
                >#</a>
            </h3>
            <Table
                :columns="methodsColumns"
                :data="api.methods"
                border
            />
        </div>
        <div
            v-else
            class="markdown-body"
            v-html="markdownApi"
        />
    </div>
</template>

<script>
import marked from 'marked'

export default {
    name: 'GuideApi',
    props: {
        api: {
            type: Object,
            required: true,
        },
        catalogues: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            propsColumns: [
                { title: '属性', key: 'name', width: 120 },
                { title: '说明', key: 'descript' },
                { title: '类型', key: 'type', width: 120 },
                { title: '默认值', key: 'default', width: 120 },
            ],
            eventsColumns: [
                { title: '事件名', key: 'name', width: 120 },
                { title: '说明', key: 'descript' },
                { title: '参数', key: 'params', width: 150 },
                { title: '返回值', key: 'back', width: 120 },
            ],
            methodsColumns: [
                { title: '方法名', key: 'name', width: 120 },
                { title: '说明', key: 'descript' },
                { title: '参数', key: 'params', width: 120 },
                { title: '返回值', key: 'back', width: 120 },
            ],
        }
    },
    computed: {
        markdownApi () {
            let apiHtml

            if (this.api.markdown) {
                apiHtml = marked(this.api.markdown)
            } else {
                apiHtml = '待续...'
            }
            return apiHtml
        },
        isShowTable () {
            if (this.api.props && this.api.props.length > 0) {
                return true
            }
            return false
        },
    },
}
</script>

<style>
@import '../../../style/front/markdown.css';
</style>

