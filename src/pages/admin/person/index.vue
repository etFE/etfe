<template>
    <section>
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            size="medium"
            class="per-form"
            label-width="100px">
            <el-row
                :gutter="20"
                type="flex"
                justify="center">
                <el-col
                    :span="11"
                >
                    <div class="p-right h-panel">
                        <el-row
                            type="flex"
                            justify="center"
                        >
                            <el-col
                                :span="12"
                                class="head-col"
                            >
                                <img
                                    :src="headImg"
                                    class="head-img">
                            </el-col>
                            <el-col
                                :span="3"
                                class="head-btn-wrap"
                            >
                                <el-button
                                    size="mini"
                                    @click="isShowImgs = true ">
                                    修改头像
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-collapse-transition>
                            <div v-show="isShowImgs">
                                <el-row>
                                    <ul class="head-imgList mask">
                                        <li
                                            v-for="img in userImgs"
                                            :key="img"
                                            class="per-img"
                                            @click="setHeadImg(img)"
                                        >
                                            <img
                                                :src="img"
                                                class="img-item">
                                        </li>
                                    </ul>

                                </el-row>
                            </div>
                        </el-collapse-transition>

                    </div>
                </el-col>
                <el-col
                    :span="8"

                    style="min-width: 340px">
                    <div class="p-left h-panel">
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
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
import api from '@/api/admin'
import userImgs from '@/assets/img/userImg'
import ElInputPassword from './PasswordInput'


export default {
    components: {
        ElInputPassword,
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
            isShowImgs: false,
            userImgs,
            headImg: '',
        }
    },
    mounted () {
        api.user.query().then((res) => {
            console.log(res)
        })
        // this.headImg = userImgs[0]
    },
    methods: {
        submit () {
            // 当展现密码框时走验证
            if (this.isShow) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // alert('submit!')
                    } else {
                        console.log('error submit!!')
                    }
                })
            } else {
                // 提交图片路径
            }
        },
        setHeadImg (img) {
            this.headImg = img
        },
    },
}
</script>

<style lang="scss">
    .per-form {
        padding-top: 40px !important;
        min-width: 500px
    }
    .per-img {
        float: left;
        margin:  10px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        font-size: 34px;
        .img-item {
            width: 100%;
        }
    }
    .head-col {
        text-align: center;
        height: 103px
    }
    .head-btn-wrap {
        display: flex;
        align-items: flex-end
    }
    .head-img {
        height: 100%
    }

    .head-imgList {
        overflow: hidden;
    }
</style>
