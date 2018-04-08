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
    data () {
        return {
            mockApi: `# 标题
## 副标题一

- 列表一\`String.split()\`
- 列表二\`Object.keys()\`
- 列表三\`Array.filter()\`

\`\`\`javascript
const a = 1;
let b = 2;
function fun() {
    console.log(a, b)
}
\`\`\`

> 说明文一
`,
        }
    },
    computed: {
        markdownApi () {
            let apiHtml

            if (this.mockApi) {
                apiHtml = marked(this.mockApi)
            } else {
                apiHtml = '待续...'
            }
            return apiHtml
        },
    },
}
</script>

<style>
@import '../../../style/front/markdown.css';
</style>

