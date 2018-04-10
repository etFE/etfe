<template>
    <el-form
        ref="form"
        :rules="rules"
        :model="form"
        size="medium"
        class="p-form"
        label-width="100px">
        <el-row
            type="flex"
            justify="center">
            <el-col :span="8">
                <ul>
                    <li class="header-img iconfont">&#xe601;</li>
                    <li class="header-img iconfont">&#xe603;</li>
                </ul>
            </el-col>
            <el-col
                :span="9"
                style="min-width: 300px">
                <el-form-item label="登录用户：">
                    <el-input
                        v-model="form.name"
                        disabled/>
                </el-form-item>
                <el-form-item label="用户角色：">
                    <el-input
                        v-model="form.role"
                        disabled/>
                </el-form-item>
                <el-collapse-transition>
                    <div v-show="isShow">
                        <el-form-item
                            label="原始密码："
                            prop="oldPass"
                        >
                            <el-input-password
                                v-model="form.oldPass"
                                disabled/>
                        </el-form-item>
                        <el-form-item
                            label="新密码："
                            prop="newPass">
                            <el-input-password v-model="form.newPass" />
                        </el-form-item>
                        <el-form-item
                            label="确认密码："
                            prop="checkPass">
                            <el-input-password v-model="form.checkPass" />
                        </el-form-item>
                    </div>
                </el-collapse-transition>
                <el-form-item >
                    <el-button
                        type="primary"
                        @click="submit"
                    >确定</el-button>
                    <el-button
                        :disabled="isShow"
                        @click="isShow = true"
                    >
                        修改密码
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import elInputPassword from './Password-input'

export default {
    components: {
        elInputPassword,
    },
    data () {
        const validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass')
                } else if (value === this.form.oldPass) {
                    callback(new Error('旧密码与新密码不能一致'))
                }
                callback()
            }
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.newPass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            form: {
                name: '222',
                role: '1111',
                oldPass: '34343',
                newPass: '6666',
                checkPass: '99999',
            },
            rules: {
                newPass: [
                    { validator: validatePass1, trigger: 'blur' },
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' },
                ],
            },
            isShow: false,
        }
    },
    watch: {
        $route () {
            console.log(this)
        },
    },
    updated () {
        console.log(2322323)
    },
    methods: {
        submit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
    },
}
</script>

<style>
    .p-form {
        padding-top: 40px !important
    }
    .header-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 34px
    }
</style>
