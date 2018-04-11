<template>
    <el-container>
        <el-form
            :inline="true"
            label-width="60px"
            size="mini">
            <el-form-item label="部门">
                <el-input/>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-search"
                    @click="queryList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-plus"
                    @click="add">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    :disabled="!currentRow"
                    type="text"
                    icon="el-icon-edit"
                    @click="edit">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    :disabled="!currentRow"
                    type="text"
                    icon="el-icon-delete"
                    @click="deleteConfirm">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="tableLoading"
            ref="table"
            :data="personList"
            :row-style="{cursor:'pointer'}"
            stripe
            size="mini"
            height="500px"
            highlight-current-row
            border
            @current-change="handleCurrentChange">
            <el-table-column
                :resizable="false"
                fixed
                width="36"
                type="index"/>
            <el-table-column
                :resizable="false"
                prop="name"
                width="80"
                label="姓名"/>
            <el-table-column
                :resizable="false"
                prop="nick"
                width="80"
                label="昵称"/>
            <el-table-column
                :resizable="false"
                prop="sexStr"
                width="60"
                label="性别"/>
            <el-table-column
                :resizable="false"
                prop="age"
                width="60"
                label="年龄" />
            <el-table-column
                :resizable="false"
                prop="phone"
                width="100"
                label="电话"/>
            <el-table-column
                :resizable="false"
                prop="email"
                width="150"
                label="电子邮箱"/>
            <el-table-column
                :resizable="false"
                min-width="200"
                prop="address"
                label="现住址"/>
            <el-table-column
                :resizable="false"
                min-width="200"
                prop="place"
                label="籍贯"/>
        </el-table>
        <el-dialog
            :visible.sync="showDialog"
            :close-on-click-modal="false"
            :title="dialogTitle"
            width="660px">
            <el-form
                ref="person"
                :model="person"
                :inline="true"
                size="mini"
                label-width="70px">
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="person.name"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="person.nick"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-select
                            v-model="person.sex"
                            style="width:185px;"
                            placeholder="请选择">
                            <el-option
                                :value="0"
                                label="男"/>
                            <el-option
                                :value="1"
                                label="女"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期">
                        <el-date-picker
                            v-model="person.birthday"
                            type="date"
                            size="mini"
                            style="width:185px;"
                            placeholder="选择日期"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input v-model="person.phone"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="person.email"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="现住址">
                        <el-input v-model="person.address"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="籍贯">
                        <el-input v-model="person.place"/>
                    </el-form-item>
                </el-col>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    size="mini"
                    @click="showDialog=false">关闭</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="save">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import api from '@/api/admin'

export default {
    data () {
        return {
            personList: [],
            currentRow: null,
            tableLoading: false,
            showDialog: false,
            dialogTitle: '提示',
            person: {},
        }
    },
    mounted () {
        this.queryList()
    },
    methods: {
        handleCurrentChange (val) {
            this.currentRow = val
        },
        queryList () {
            this.tableLoading = true
            api.person.query()
                .then((response) => {
                    this.personList = response.data
                    this.tableLoading = false
                })
                .catch(() => {
                    this.tableLoading = false
                })
        },
        add () {
            this.person = {}
            this.currentRow = null
            this.$refs.table.setCurrentRow()
            this.dialogTitle = '添加'
            this.showDialog = true
        },
        edit () {
            this.person = Object.assign({}, this.currentRow)
            this.dialogTitle = '编辑'
            this.showDialog = true
        },
        save () {
            if (this.currentRow) {
                api.person.update({
                    param: {
                        id: this.person.id,
                    },
                    data: this.person,
                }).then((response) => {
                    for (let i = 0; i < this.personList.length; i += 1) {
                        if (this.personList[i].id === this.person.id) {
                            this.personList.splice(i, 1, response.data)
                            break
                        }
                    }
                    this.showDialog = false
                })
            } else {
                api.person.add({
                    data: this.person,
                }).then((response) => {
                    this.personList.push(response.data)
                })
            }
            this.showDialog = false
        },
        remove () {
            const { id } = this.currentRow
            api.person.delete({
                param: {
                    id,
                },
            }).then((response) => {
                for (let i = 0; i < this.personList.length; i += 1) {
                    if (this.personList[i].id === response.data.id) {
                        this.personList.splice(i, 1)
                        break
                    }
                }
            })
        },
        deleteConfirm () {
            if (this.currentRow) {
                this.$confirm('确认删除当前选择数据？')
                    .then(this.remove)
                    .catch()
            }
        },
    },
}
</script>

<style>

</style>
