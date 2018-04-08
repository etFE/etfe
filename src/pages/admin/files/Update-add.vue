<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :before-close="dialogClosed"
    width="450px"
    @open="dialogOpened">
    <span slot="title">{{ title }}</span>
    <el-form
      v-loading="formDataloading"
      ref="Form"
      :model="form"
      :rules="rules"
      status-icon>
      <el-form-item
        :label-width="formLabelWidth"
        label="文件名称："
        class="form-item"
        prop="name">
        <el-input
          v-model="form.name"
          :disabled="disabled"
          auto-complete="off"
          size="medium" />
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="过期日期："
        class="form-item"
        prop="expireDate">
        <el-date-picker
          v-model="form.expireDate"
          type="datetime"
          placeholder="选择过期日期时间"
          size="medium" />
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="是否可用：">
        <el-radio-group v-model="form.enable">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="文件描述："
        style="width: 350px;height: 68px"
        prop="descript">
        <el-input
          v-model="form.descript"
          type="textarea"
          size="medium" />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="dialogClosed">取 消</el-button>
      <el-button
        type="primary"
        @click="submitDailog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from '@/api/admin'

export default {
    name: 'UpdateAdd',
    props: {
        isShow: Boolean,
        operation: String,
        rowData: Object,
    },
    data () {
        return {
            formLabelWidth: '95px',
            formDataloading: false,
            form: {
                enable: 1,
            },
            fileList: [
            ],
            typeOptions: [
                {
                    text: 'HTML',
                    value: 'HTML',
                },
                {
                    text: 'css',
                    value: 'css',
                },
                {
                    text: 'JavaScript',
                    value: 'JavaScript',
                },
            ],
            // 验证规则
            rules: {
                name: { required: true, message: '请输入文件名称', trigger: 'blur' },
                expireDate: { required: true, message: '请输入过期日期', trigger: 'blur' },
                // path: {required: true, message: "请上传文件"},
                descript: [
                    { required: true, message: '请输入描述信息' },
                    { min: 6, max: 30, message: '长度在 6 到 30 个字符' },
                ],
            },
        }
    },
    computed: {
        title () {
            if (this.operation === 'add') {
                return '添加页'
            }
            return '修改页'
        },
        disabled () {
            if (this.operation === 'add') {
                return false
            }
            return true
        },
    },
    methods: {
        dialogOpened () {
            if (this.rowData) {
                this.form = { ...this.form, ...this.rowData.row }
            } else {
                this.form = {
                    enable: 1,
                }
            }
        },
        dialogClosed () {
            this.$refs.Form.resetFields()
            this.$parent.rowData = null
            this.$emit('toggleShow')
        },
        submitUpload () {
            this.$refs.upload.submit()
        },
        submitDailog () {
            this.formDataloading = true
            // 上传文件
            // this.submitUpload();
            // 提交前先验证
            this.submitForm()

            const newData = { ...this.form }

            if (this.formDataloading) {
                if (this.operation === 'add') {
                    api.file.add({ data: newData })
                        .then((res) => {
                            this.formDataloading = false
                            this.$parent.tableData.push(res.data)
                            this.dialogClosed()
                        })
                        .catch(() => {
                            this.formDataloading = false
                        })
                } else {
                    api.file.update({ param: { id: newData._id }, data: newData })
                        .then(() => {
                            const index = this.rowData.$index
                            this.$parent.$set(this.$parent.tableData, index, newData)
                            this.formDataloading = false
                            this.dialogClosed()
                        })
                        .catch(() => {
                            this.formDataloading = false
                        })
                }
            }
        },
        submitForm () {
            this.$refs.Form.validate((valid) => {
                if (!valid) {
                    this.formDataloading = false
                }
            })
        },
        filesUpLoaded (path) {
            console.log('uploaded success')
            this.form.path = path
        },
        filesUnloaded () {
            console.log('filesloaded error')
        },
    },
}
</script>

<style>
.form-item {
  width: 300px;
}
</style>
