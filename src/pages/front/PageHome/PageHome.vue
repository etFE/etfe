<template>
    <div class="et-home-container">
        <home-background />
        <log-in />
        <!-- <h1>霸气</h1> -->
    </div>
</template>

<script>
import HomeBackground from './HomeBackground'
import LogIn from './LogIn'

export default {
    name: 'PageHome',
    components: {
        HomeBackground,
        LogIn,
    },
    data () {
        return {
        }
    },
}
</script>

<style lang="scss">
.et-home-container {
    margin-top: 0;

    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 60px;
    z-index: 0;
    overflow: hidden;
    background-color: rgb(135, 135, 135);

    // h1 {
    //     color: #fff;
    //     text-align: center;
    //     position: relative;
    //     z-index: 100;
    //     font-size: 80px;
    //     line-height: 500px;
    //     letter-spacing: 50px;
    // }
}
</style>
