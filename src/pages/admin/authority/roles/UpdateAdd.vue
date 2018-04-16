<template>
    <el-dialog
        :close-on-click-modal="false"
        :visible.sync="isShow"
        :before-close="dialogClosed"
        width="1050px"
        @open="dialogOpened">
        <span slot="title">{{ title }}</span>
        <el-form
            v-loading="formDataloading"
            ref="Form"
            :model="form"
            :rules="rules"
            status-icon
            inline>
            <el-row>
                <el-form-item
                    :label-width="formLabelWidth"
                    label="角色名称："
                    class="update-form-item"
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
                    class="update-form-item"
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
                    label="角色描述："
                    style="height: 48px"
                    class="update-form-item"
                    prop="descript">
                    <el-input
                        v-model="form.descript"
                        type="textarea"
                        size="medium" />
                </el-form-item>
            </el-row>
            <el-row
                type="flex"
                justify="center">
                <el-form-item prop="menus">
                    <el-transfer
                        v-loading="transLoading"
                        v-model="form.menus"
                        :titles="['所有菜单', '所选菜单']"
                        :button-texts="['到左边', '到右边']"
                        :data="menusList"
                        filterable />
                </el-form-item>
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
        isShow: { type: Boolean, default: false },
        operation: { type: String, default: '' },
        rowData: { type: Object, default: null },
    },
    data () {
        return {
            transLoading: false,
            formLabelWidth: '95px',
            formDataloading: false,
            form: {
                menus: [],
                system: undefined,
            },
            menusList: [],
            sysOptions: [],
            // 验证规则
            rules: {
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                system: { required: true, message: '请选择系统模块' },
                // menus: {
                //   // required: true,
                //   message: "请选择对应菜单文件",
                //   trigger: "blur"
                // },
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
        system () {
            return this.form.system
        },
    },
    watch: {
        system () {
            if (this.form.system) {
                this.queryMenu(this.form.system)
            }
        },
    },
    methods: {
        dialogOpened () {
            // 初始化下拉框参数
            this.fetchSysData()
            // 初始化菜单选项
            // this.queryMenu();

            if (this.rowData) {
                this.form = { ...this.form, ...this.rowData.row }
                this.form.system = this.rowData.row.system._id
                this.form.menus = this.rowData.row.menus.map(item => item._id)
            } else {
                this.form = {

                }
            }
        },
        dialogClosed () {
            this.$refs.Form.resetFields()
            this.$parent.rowData = null
            this.$parent.showDialog = false
        },
        submitDailog () {
            this.formDataloading = true
            // 上传文件
            // 提交前先验证
            this.submitForm()

            const newData = { ...this.form }

            if (this.formDataloading) {
                if (this.operation === 'add') {
                    api.role.add({ data: newData })
                        .then(() => {
                            this.formDataloading = false
                            // this.$parent.tableData.push(res.data);
                            this.dialogClosed()
                        })
                        .catch(() => {
                            this.formDataloading = false
                        })
                } else {
                    api.role.update({ param: { id: newData._id }, data: newData })
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
                    console.log('未通过')
                }
            })
        },
        // 根据系统查询菜单
        queryMenu (id) {
            this.transLoading = true
            if (!id) {
                api.menu.query().then((res) => {
                    const { data } = res

                    const result = data.map(item => ({
                        key: item._id,
                        label: item.name,
                    }))
                    this.menusList = result
                    this.transLoading = false
                })
                    .catch(() => {
                        this.transLoading = false
                    })
            } else {
                api.menu.queryBySys({ param: { id } }).then((res) => {
                    const { data } = res
                    const result = data.map(item => ({
                        key: item._id,
                        label: item.name,
                    }))
                    this.menusList = result
                    this.transLoading = false
                })
                    .catch(() => {
                        this.transLoading = false
                    })
            }
        },
        // 查询系统模块数据
        fetchSysData () {
            api.system.query().then((res) => {
                this.sysOptions = res.data
            })
        },
    },
}
</script>

<style scoped>
.update-form-item {
  width: 320px;
}
</style>

