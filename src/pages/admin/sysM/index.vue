<template>
    <section class="user-manage">
        <div class="L-selects">
            <el-form
                :inline="true"
                :model="listQuery"
                label-width="85px">
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                        @click="queryList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="small"
                        @click="openDialog()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="L-grid">
            <el-table
                v-loading="tabLoading"
                :header-cell-style="{textAlign: 'center'}"
                :data="tableData"
                stripe
                border
                height="100%">
                <el-table-column
                    type="index"
                    width="50" />
                <el-table-column
                    prop="name"
                    label="系统名称"
                    width="200px" />
                <el-table-column
                    prop="descript"
                    label="系统描述"
                    width="250px" />
                <el-table-column
                    label="操作"
                    align="center"
                    min-width="180">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="openDialog(scope)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteData(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <update-add-dailog
            v-bind="{isShow: showDialog, operation: operate, rowData: rowData}"
            @toggleShow="changeDialogState" />
    </section>
</template>

<script>
import api from '@/api/admin'
import UpdateAddDailog from './Update-add'

export default {
    components: {
        UpdateAddDailog,
    },
    data () {
        return {
            tableData: [],
            listQuery: {
                filename: '',
                // curPage: 1,
                // pageSize: 20,
                // importance: undefined,
                // title: undefined,
                // type: undefined,
            },
            tabLoading: false,
            showDialog: false,
            operate: '', // 决定弹出窗口是添加也还是修改页的变量
            rowData: null, // 切换修改页时传过来的行数据
        }
    },
    methods: {
        openDialog (scope) {
            if (!scope) {
                this.operate = 'add'
            } else {
                this.operate = 'update'
                this.rowData = scope
            }
            this.showDialog = true
        },
        // 查询表格数据
        queryList () {
            this.tabLoading = true
            api.system.query({ params: this.listQuery })
                .then((response) => {
                    this.tableData = response.data
                    this.tabLoading = false
                })
                .catch(() => {
                    this.tabLoading = false
                })
        },
        deleteData (index, data) {
            this.tabLoading = true
            api.system.delete({ param: { id: data._id }, data })
                .then(() => {
                    this.tableData.splice(index, 1)
                    this.tabLoading = false
                })
                .catch(() => {
                    this.tabLoading = false
                })
        },
        changeDialogState () {
            this.showDialog = false
        },
    },
}
</script>

<style lang="scss">

</style>
