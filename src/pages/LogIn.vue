<template>
    <div class="et-login-container">
        <home-background />
        <div class="et-login-form">
            <Form
                ref="loginForm"
                :model="formInline"
                :rules="ruleInline"
            >
                <FormItem prop="user">
                    <i-input
                        v-model="formInline.user"
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
import HomeBackground from '@/pages/front/PageHome/HomeBackground'

export default {
    name: 'LogIn',
    components: {
        HomeBackground,
    },
    data () {
        return {
            formInline: {
                user: '',
                password: '',
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        handleLogin (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push('/')
                }
            })
        },
    },
}
</script>

<style lang="scss">
@import url('../style/front/index.scss');

.et-login-container {
    height: 100%;
    position: relative;

    .et-login-form {
        width: 300px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 50;
    }
}

</style>
