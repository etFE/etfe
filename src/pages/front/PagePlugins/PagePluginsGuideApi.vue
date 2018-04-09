<template>
    <div
        class="markdown-body"
        v-html="markdownApi"
    />
</template>

<script>
import marked from 'marked'

export default {
    name: 'GuideApi',
    props: {
        api: {
            type: String,
            default: '',
        },
    },
    computed: {
        markdownApi () {
            let apiHtml

            if (this.api) {
                apiHtml = marked(this.api)
            } else {
                apiHtml = '待续...'
            }
            console.log(apiHtml, this.api)
            return apiHtml
        },
    },
}
</script>

<style>
@import '../../../style/front/markdown.css';
</style>

