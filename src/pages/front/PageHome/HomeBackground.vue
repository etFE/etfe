<template>
    <div
        v-show="backgroundUrl"
        :style="{ background: `url(${backgroundUrl}) 50% 50% / cover` }"
        class="et-home-background"
    >
        <div class="et-home-background-msg">
            Photo by
            <a
                :src="imgMsg.link"
                target="_blank"
            >{{ imgMsg.name }}</a> /
            <a
                src="https://unsplash.com"
                target="_blank"
            >Unsplash</a>
            <Avatar
                :src="imgMsg.avater"
                size="small"
                shape="square"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeBackground',
    computed: {
        backgroundUrl () {
            const bgUrls = this.$store.state.front.home.backgroundUrl
            return bgUrls.small
        },
        imgMsg () {
            return this.$store.state.front.home.imgMsg
        },
    },
    mounted () {
        this.$store.dispatch('front/home/GET_BACKGROUND')
    },
}
</script>

<style lang="scss">
.et-home-background {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 1;
    @include filterBlur;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        opacity: 0.8;
        background-color: rgba(0, 0, 0, 0.3);
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .et-home-background-msg {
        position: absolute;
        bottom: 50px;
        right: 50px;
        color: #fff;

        a {
            color: #fff;
        }
    }
  }
</style>
