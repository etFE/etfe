<template>
    <el-input
        v-model="valuem"
        :disabled= "disabled"
        :type="type"
        auto-complete="off"
        @input="handlePassword"
    >
        <el-button
            slot="append"
            class="iconfont"
            size="mini"
            @click="setType"
        >
            <span v-if="type === 'password'">&#xe79c;</span>
            <span v-else>&#xe79d;</span>
        </el-button>
    </el-input>
</template>

<script>
export default {
    props: {
        value: { type: String, default: '' },
        disabled: { type: String, default: '' },
    },
    data () {
        return {
            valuem: this.value,
            type: 'password',
        }
    },
    methods: {
        handlePassword (value) {
            this.$emit('input', value) // 触发 input 事件，并传入新值
        },
        setType () {
            if (this.type === 'password') {
                this.type = 'text'
            } else {
                this.type = 'password'
            }
        },
    },
}
</script>

<style>

</style>
