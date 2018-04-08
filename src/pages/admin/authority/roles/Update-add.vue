<template>
    <el-dialog
        :visible.sync="isShow"
        :before-close="dialogClosed"
        @open="dialogOpened"
        width="1050px"
        :close-on-click-modal="false">
        <span slot="title">{{ title }}</span>
        <el-form
            :model="form"
            v-loading="formDataloading"
            ref="Form"
            :rules="rules"
            status-icon
            inline>
            <el-row>
                <el-form-item
                    label="角色名称："
                    :label-width="formLabelWidth"
                    class="form-item"
                    prop="name">
                    <el-input
                        v-model="form.name"
                        auto-complete="off"
                        size="medium"
                        :disabled="disabled"/>
                </el-form-item>
                <el-form-item
                    label="系统模块："
                    :label-width="formLabelWidth"
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
                            auto-complete="true"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="角色描述："
                    :label-width="formLabelWidth"
                    style="height: 48px"
                    class="form-item"
                    prop="descript">
                    <el-input
                        type="textarea"
                        v-model="form.descript"
                        size="medium"/>
                </el-form-item>
            </el-row>
            <el-row
                type="flex"
                justify="center">
                <el-form-item prop="menus">
                    <el-transfer
                        v-loading="transLoading"
                        v-model="form.menus"
                        filterable
                        :titles="['所有菜单', '所选菜单']"
                        :button-texts="['到左边', '到右边']"
                        :data="menusList" />
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
// import { queryMenuBySys, queryMenuData } from '@/api/admin/menuManage';
// import { querySysData  } from "@/api/admin/sysManage";
// import {addRoleData, updateRoleData} from "@/api/admin/rolesManage";

export default {
    name: 'UpdateAdd',
    props: ['isShow', 'operation', 'rowData'],
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
            console.log(this.form.system, 11112222)

            this.form.system && this.queryMenu(this.form.system)
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
                console.log(this.rowData, 4445555555554)
            } else {
                this.form = {

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
            console.log(newData, 'submit')

            if (this.formDataloading) {
                if (this.operation === 'add') {
                    addRoleData(newData)
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
                    updateRoleData(newData._id, newData)
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
                    console.log('未通过')
                }
            })
        },
        // 根据系统查询菜单
        queryMenu (id) {
            const data = []
            this.transLoading = true
            let queryMethod
            if (!id) {
                queryMenuData().then((res) => {
                    const { data } = res

                    const result = data.map((item, index) => ({
                        key: item._id,
                        label: item.name,
                    }))
                    this.menusList = result
                    this.transLoading = false
                })
                    .catch((error) => {
                        this.transLoading = false
                    })
            } else {
                queryMenuBySys(id).then((res) => {
                    const { data } = res
                    const result = data.map((item, index) => ({
                        key: item._id,
                        label: item.name,
                    }))
                    this.menusList = result
                    console.log(this.menusList, 4454545)
                    this.transLoading = false
                })
                    .catch((error) => {
                        this.transLoading = false
                    })
            }
        },
        // 查询系统模块数据
        fetchSysData () {
            querySysData().then((res) => {
                this.sysOptions = res.data
            })
        },
    },
}
</script>

<style scoped>
.form-item {
  width: 320px;
}
</style>

