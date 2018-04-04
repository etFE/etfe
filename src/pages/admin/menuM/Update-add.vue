<template>
    <el-dialog :visible.sync="isShow" :before-close='dialogClosed' @open="dialogOpened" width="1000px" :close-on-click-modal='false'>
        <span slot="title">{{title}}</span>
        <el-form :model="form" v-loading="formDataloading" ref="Form" :rules="rules" status-icon>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="菜单名称：" :label-width="formLabelWidth" class="form-item" prop="name">
                        <el-input v-model="form.name" auto-complete="off" size="medium" :disabled='disabled'></el-input>
                    </el-form-item>
                    <el-form-item label="系统模块：" :label-width="formLabelWidth" class="form-item" prop="system">
                        <el-select v-model="form.system" filterable default-first-option placeholder="请输入关键词" size="medium">
                            <el-option v-for="item in sysOptions" :key="item._id" :label="item.descript" :value="item._id" auto-complete='true'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文件描述：" :label-width="formLabelWidth" style="width: 350px;height: 68px" prop="descript">
                        <el-input type="textarea" v-model="form.descript" size="medium"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item prop="file">
                        <el-transfer v-loading='transLoading' v-model="form.file" filterable :titles="['所有文件', '所选文件']" :button-texts="['到左边', '到右边']" :data="filesList" />
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogClosed">取 消</el-button>
            <el-button type="primary" @click="submitDailog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { queryFileData } from '@/api/admin/filesManage';
import { addMenuData, updateMenuData } from '@/api/admin/menuManage'
import { querySysData } from '@/api/admin/sysManage'

export default {
    name: 'Update-add',
    props: ['isShow', 'operation', 'rowData'],
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
    mounted () {
        this.initSysData()
    },
    computed: {
        title () {
            if (this.operation === "add") {
                return "添加页";
            } 
                return "修改页";
            
        },

        disabled () {
            if (this.operation === "add") {
                return false;
            } 
                return true;
            
        },
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
            console.log(11111, this.form)
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
            console.log(newData, 'submit')

            if (this.formDataloading) {
                if (this.operation === 'add') {
                    addMenuData(newData)
                        .then((res) => {
                            this.formDataloading = false
                            console.log('res', res)
                            // this.$parent.tableData.push(res.data);
                            this.dialogClosed()
                        })
                        .catch((error) => {
                            this.formDataloading = false
                        })
                } else {
                    updateMenuData(newData._id, newData)
                        .then((res) => {
                            const index = this.rowData.$index
                            this.$parent.$set(this.$parent.tableData, index, newData)
                            this.formDataloading = false
                            this.dialogClosed()
                        })
                        .catch((error) => {
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
            const data = []
            this.transLoading = true
            queryFileData().then((res) => {
                const { data } = res
                const result = data.map((item, index) => ({ key: item._id, label: item.name }))
                this.filesList = result
                this.transLoading = false
            }).catch((error) => {
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
            querySysData().then((res) => {
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
