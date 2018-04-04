<template>
    <div class="et-footer-copyright">
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'FooterCopyright',
    data () {
        return {
            msg: '© 2018 | ETFT 亦童前端团队',
        }
    },
}
</script>

<style lang="scss">
// 页脚字体颜色
$footerFont: #b9b9b9;

.et-footer-copyright {
  text-align: center;
  color: $footerFont;
  height: 30px;
  line-height: 30px;
  background: transparent;
}
</style>
