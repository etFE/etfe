<template>
    <div class="et-notfound-container">
        <et-logo />
        <p class="et-notfound-text">
            Oops! 404 NotFound
        </p>
        <p class="et-notfound-tip">
            {{ lastTime }} 秒后返回上一页...
        </p>
    </div>
</template>

<script>
import EtLogo from '@/components/EtLogo'

export default {
    name: 'NotFound',
    components: {
        EtLogo,
    },
    data () {
        return {
            lastTime: 5,
        }
    },
    mounted () {
        setInterval(() => {
            this.lastTime = this.lastTime - 1

            if (this.lastTime === 0) {
                this.$router.go(-1)
            }
        }, 1000)
    },
}
</script>

<style lang="scss">
.et-notfound-container {
  text-align: center;
}
.et-notfound-text {
  font-size: 40px;
  height: 200px;
  line-height: 200px;
  font-weight: 400;
}
.et-notfound-tip {
  font-size: 22px;
  height: 80px;
  line-height: 80px;
}
</style>
