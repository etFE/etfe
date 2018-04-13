<template>
    <el-container>
        <el-form
            :inline="true"
            :model="listQuery"
            size="mini"
            label-width="85px">
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
                    @click="openDialog()">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="tabLoading"
            :data="tableData"
            size="mini"
            stripe
            border>
            <el-table-column
                type="index"
                width="36" />
            <el-table-column
                prop="name"
                label="系统名称"
                width="200px" />
            <el-table-column
                prop="descript"
                label="系统描述" />
            <el-table-column
                label="操作"
                align="center"
                width="80">
                <template slot-scope="scope">
                    <a
                        href="javascript:;"
                        @click="openDialog(scope)">编辑</a>
                    <a
                        href="javascript:;"
                        @click="deleteData(scope.$index, scope.row)">删除</a>
                </template>
            </el-table-column>
        </el-table>
        <update-add-dailog
            v-bind="{isShow: showDialog, operation: operate, rowData: rowData}"
            @toggleShow="changeDialogState" />
    </el-container>
</template>

<script>
import api from '@/api/admin'
import UpdateAddDailog from './UpdateAdd'

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
    mounted () {
        this.queryList()
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

