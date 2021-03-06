<template>
    <section>
        <el-form
            v-loading="loading"
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
                <el-col :span="11">
                    <div class="p-right h-panel">
                        <el-row
                            type="flex"
                            justify="center">
                            <el-col
                                :span="12"
                                class="per-avatar-col">
                                <el-upload
                                    :action="upLoadSrc"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    class="per-avatar-upload"
                                >
                                    <div
                                        @mouseout="showMask = false"
                                        @mouseover="showMask = true">
                                        <img
                                            v-show="!showMask"
                                            :src="form.avatar"
                                            class="avatar">
                                        <i
                                            v-show="showMask"
                                            class="el-icon-plus avatar-uploader-icon" />

                                    </div>
                                </el-upload>

                            </el-col>
                            <el-col
                                :span="3"
                                class="per-avatar-btn-wrap">
                                <el-button
                                    :disabled="isShowImgs"
                                    size="mini"
                                    @click="isShowImgs = true ">
                                    修改头像
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-collapse-transition>
                            <div v-show="isShowImgs">
                                <el-row>
                                    <ul class="per-imgList">
                                        <li
                                            v-for="img in userImgs"
                                            :key="img"
                                            class="per-img-wrap"
                                            @click="setAvatar(img)">
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
                                v-model="form.username"
                                disabled/>
                        </el-form-item>
                        <el-form-item label="用户昵称：">
                            <el-input
                                v-model="form.nick"
                                disabled/>
                        </el-form-item>
                        <el-form-item label="用户角色：">
                            <el-select
                                v-model="form.roles"
                                multiple
                                disabled
                                placeholder="请选择"/>
                        </el-form-item>
                        <el-collapse-transition>
                            <div v-show="isShow">
                                <el-form-item
                                    label="原始密码："
                                    prop="password">
                                    <el-input-password
                                        v-model="form.password"
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
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submit">确定</el-button>
                            <el-button
                                :disabled="isShow"
                                @click="isShow = true">
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
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api/admin'
import defaultImg from '@/assets/img/avater-male.jpg'
import userImgs from '@/assets/img/userImg'
import ElInputPassword from './PasswordInput'

export default {
    components: {
        ElInputPassword,
    },
    data () {
        // 新密码框验证
        const validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass')
                } else if (value === this.form.password) {
                    callback(new Error('旧密码与新密码不能一致'))
                }
                callback()
            }
        }

        // 确认密码框验证
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
                nick: '',
                username: '',
                roles: [],
                password: '',
                newPass: '',
                checkPass: '',
                avatar: '',
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
            showMask: false,
            loading: false,
            upLoadSrc: 'http:localhost:3000/manage/file/upload',
        }
    },
    mounted () {
        this.loading = true
        this.$store.dispatch('global/GET_USER_INFO').then((res) => {
            this.loading = false
            this.form = { ...this.form, ...res.data.data }
            // 没头像时默认第一个
            if (!this.form.avatar) {
                this.form.avatar = defaultImg
            }
        })
    },
    methods: {
        // 上传数据
        postData () {
            this.loading = true
            api.user.update({ param: { id: this.form._id }, data: this.form }).then(() => {
                this.loading = false
            })
        },
        submit () {
            // 当展现密码框时走验证
            if (this.isShow) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$set(this.form, 'password', this.form.newPass)
                        this.$delete(this.form, 'newPass')
                        this.$delete(this.form, 'checkPass')
                        this.postData()
                    }
                })
            } else {
                this.postData()
            }
        },
        // 设置头像
        setAvatar (img) {
            this.form.avatar = img
        },
        // 头像上传成功
        handleAvatarSuccess () {
        },
        // 上传之前的钩子
        beforeAvatarUpload () {

        },
    },
}
</script>

<style lang="scss">
.per-form {
  padding-top: 40px !important;
  min-width: 500px;
}

.per-imgList {
  overflow: hidden;
  .per-img-wrap {
    float: left;
    margin: 10px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 34px;
    .img-item {
      width: 100%;
    }
  }
}

.per-avatar-col {
  text-align: center;
  height: 103px;
}
.per-avatar-btn-wrap {
  display: flex;
  align-items: flex-end;
}
.per-avatar-upload {
      .avatar {
        border-radius: 50%;
        height: 103px;
        position: relative;
      }

  .avatar-uploader-icon {
    width: 103px;
    height: 103px;
    line-height: 103px;
    font-size: 28px;
    border-radius: 50%;
    color: #8c939d;
    background: #dadadafa;
    text-align: center;
  }
}
</style>
