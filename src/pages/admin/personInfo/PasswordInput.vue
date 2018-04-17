<template>
    <el-input
        v-model="valueM"
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
        value: { type: String, default: undefined },
        disabled: { type: Boolean, default: false },
    },
    data () {
        return {
            type: 'password',
        }
    },
    computed: {
        valueM: {
            get () {
                return this.value
            },
            set (val) {
                return val
            },
        },
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

