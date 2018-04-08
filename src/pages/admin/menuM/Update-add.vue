<template>
  <el-dialog
    :visible.sync="isShow"
    :before-close="dialogClosed"
    :close-on-click-modal="false"
    width="1000px"
    @open="dialogOpened">
    <span slot="title">{{ title }}</span>
    <el-form
      v-loading="formDataloading"
      ref="Form"
      :model="form"
      :rules="rules"
      status-icon>
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item
            :label-width="formLabelWidth"
            label="菜单名称："
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
            label="系统模块："
            class="form-item"
            prop="system">
            <el-select
              v-model="form.system"
              filterable
              default-first-option
              placeholder="请输入关键词"
              size="medium">
              <el-option
                v-for="item in sysOptions"
                :key="item._id"
                :label="item.descript"
                :value="item._id"
                auto-complete="true" />
            </el-select>
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
        </el-col>
        <el-col :span="14">
          <el-form-item prop="file">
            <el-transfer
              v-loading="transLoading"
              v-model="form.file"
              :titles="['所有文件', '所选文件']"
              :button-texts="['到左边', '到右边']"
              :data="filesList"
              filterable />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center">
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
            transLoading: false,
            formLabelWidth: '95px',
            formDataloading: false,
            form: {
                file: [1],
            },
            filesList: [],
            sysOptions: [

            ],
            // 验证规则
            rules: {
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                module: { required: true, message: '请选择系统模块' },
                file: { required: true, message: '请选择对应菜单文件', trigger: 'blur' },
                descript: [
                    { message: '请输入描述信息' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符' },
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
    mounted () {
        this.initSysData()
    },
    methods: {
        dialogOpened () {
            this.queryAllFiles()
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
        submitDailog () {
            this.formDataloading = true
            // 上传文件
            // 提交前先验证
            this.submitForm()
            const newData = { ...this.form }

            if (this.formDataloading) {
                if (this.operation === 'add') {
                    api.menu.add({ data: newData })
                        .then((res) => {
                            this.formDataloading = false
                            console.log('res', res)
                            this.$parent.tableData.push(res.data)
                            this.dialogClosed()
                        })
                        .catch(() => {
                            this.formDataloading = false
                        })
                } else {
                    api.menu.update({ param: { id: newData._id }, data: newData })
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
        queryAllFiles () {
            this.transLoading = true
            api.file.query().then((res) => {
                const { data } = res
                const result = data.map(item => ({ key: item._id, label: item.name }))
                this.filesList = result
                this.transLoading = false
            }).catch(() => {
                this.transLoading = false
            })

            // // 模拟数据
            // setTimeout(() => {
            //   for (let i = 1; i <= 15; i++) {
            //     data.push({
            //       key: i,
            //       label: `备选项 ${ i }`,
            //       disabled: i % 4 === 0
            //     });
            //   }
            //    this.transLoading = false;
            // }, 2000);

            // this.filesList = data;
        },
        initSysData () {
            api.system.query().then((res) => {
                this.sysOptions = res.data
            })
        },
    },
}
</script>

<style>
.form-item {
  width: 300px;
}
</style>
