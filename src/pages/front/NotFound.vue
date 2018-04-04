<template>
    <div class="et-notfound-container">
        <p class="et-notfound-text">
            NotFound
        </p>
        <p class="et-notfound-tip">
            {{lastTime}} 秒后返回主页...
        </p>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    data () {
        return {
            lastTime: 5,
        }
    },
    mounted () {
        setInterval(() => {
            this.lastTime = this.lastTime - 1
        }, 1000)
        setTimeout(() => {
            this.$router.push({ path: '/' })
        }, 5000)
    },
}
</script>

<style lang="scss">
.et-notfound-container {
  text-align: center;
}
.et-notfound-text {
  font-size: 64px;
  height: 200px;
  line-height: 200px;
}
.et-notfound-tip {
  font-size: 24px;
  height: 80px;
  line-height: 80px;
}
</style>
