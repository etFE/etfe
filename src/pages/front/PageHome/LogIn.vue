<template>
    <div class="et-login-container">
        <div v-if="!isLogin && isShowLogin">
            <!-- <h3>欢迎登录~~</h3> -->
            <Form
                ref="loginForm"
                :model="formInline"
                :rules="ruleInline"
                class="et-login-form"
            >
                <FormItem prop="username">
                    <i-input
                        v-model="formInline.username"
                        type="text"
                        placeholder="账号"
                    />
                </FormItem>
                <FormItem prop="password">
                    <i-input
                        v-model="formInline.password"
                        type="password"
                        placeholder="密码"
                    />
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        long
                        @click="handleLogin('loginForm')"
                    >登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>

export default {
    name: 'LogIn',
    data () {
        return {
            formInline: {
                username: '',
                password: '',
            },
            ruleInline: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.global.isLogin
        },
        isShowLogin () {
            return this.$store.state.front.home.isShowLogin
        },
    },
    methods: {
        handleLogin (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('global/LOG_IN', this.formInline).then(() => {
                        this.formInline.username = ''
                        this.formInline.password = ''
                    })
                }
            })
        },
    },
}
</script>

<style lang="scss">
.et-login-container {
    width: 260px;
    position: absolute;
    top: 45%;
    right: 100px;
    transform: translate(0, -50%);
    z-index: 50;

    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    // h3 {
    //     font-weight: 400;
    //     margin-bottom: 10px;
    //     padding: 20px 20px 10px 20px;
    //     border-bottom: 1px solid $borderColor;
    //     color: #fff;
    // }

    .et-login-form {
        // padding: 10px 20px 0;
        padding: 30px 20px 0;
    }
}
</style>
