<template>
    <section class="user-manage">
        <div class="L-selects">
            <el-form
                label-width="85px"
                :inline="true"
                :model="listQuery">
                <el-row>
                    <el-form-item label="角色名称：">
                        <el-input
                            v-model="listQuery.name"
                            size="medium"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            size="small"
                            @click="queryList"
                        >查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-plus"
                            size="small"
                            @click="openDialog()">添加</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="L-grid">
            <el-table
                :data="tableData"
                stripe
                border
                height="100%"
                v-loading="tabLoading"
                :header-cell-style="{textAlign: 'center'}">
                <el-table-column
                    type="index"
                    width="50"/>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                            :data="props.row.menus"
                            stripe
                            border
                            :header-cell-style="{textAlign: 'center'}">
                            <el-table-column
                                prop="name"
                                label="菜单名称"
                                width="140"/>
                            <el-table-column
                                prop="descript"
                                label="菜单描述"
                                width="120"/>
                            <el-table-column
                                prop="system.descript"
                                label="菜单所属系统"/>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="角色名称"
                    width="180"/>
                <el-table-column
                    prop="descript"
                    label="角色描述"
                    width="180"/>
                <el-table-column
                    prop="createDate"
                    label="角色创建日期"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createDate| moment("YYYY-MM-DD HH:mm:ss") }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="system" label="相关管理菜单" width="180">
        </el-table-column> -->
                <el-table-column
                    prop="system.descript"
                    label="相关管理系统"
                    width="180"/>
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
        <el-pagination
            class="L-pag"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"
        />
        <update-add-dailog
            v-bind="{isShow: showDialog, operation: operate, rowData: rowData}"
            @toggleShow="changeDialogState"/>
    </section>
</template>

<script>
import UpdateAddDailog from './update-add'
// import { queryRoleData, delRoleData } from "@/api/admin/rolesManage";

export default {
    name: 'Role',
    components: {
        UpdateAddDailog,
    },
    data () {
        return {
            tableData: [
                {
                    name: 'select',
                    descript: '范德萨发三',
                    system: 'sys',
                    file: [
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                    ],
                },
                {
                    name: 'select',
                    descript: '范德萨发三',
                    system: 'sys',
                    file: [
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                    ],
                },
                {
                    name: 'select',
                    descript: '范德萨发三',
                    system: 'sys',
                    file: [
                        {
                            name: 'etSelect',
                            descript: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            filedesc: '下拉框组件',
                            enable: '0',
                        },
                        {
                            name: 'etSelect',
                            filedesc: '下拉框组件',
                            enable: '0',
                        },
                    ],
                },
            ],
            tabParam: {},
            listQuery: {
                name: '',
                // curPage: 1,
                // pageSize: 20,
                // importance: undefined,
                // title: undefined,
                // type: undefined,
            },
            remoteOptions: [
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
            typeOptions: [],
            typeValue: [],
            tabLoading: false,
            inputLoading: false,
            showDialog: false,
            operate: '', // 决定弹出窗口是添加也还是修改页的变量
            rowData: null, // 切换修改页时传过来的行数据
        }
    },
    methods: {
        selectGetData (query) {
            if (query !== '') {
                this.inputLoading = true
                setTimeout(() => {
                    this.inputLoading = false
                    this.typeOptions = this.remoteOptions.filter(item => item.text.toLowerCase().indexOf(query.toLowerCase()) > -1)
                }, 200)
            } else {
                this.typeOptions = this.remoteOptions
            }
        },
        openDialog (scope) {
            if (!scope) {
                this.operate = 'add'
            } else {
                this.operate = 'update'
                console.log('score', scope)
                this.rowData = scope
            }
            this.showDialog = true
        },
        //  分页器 设置每页发送多少数据的方法
        handleSizeChange (val) {
            console.log(val, 34343)
            this.listQuery.pageSize = val
            this.queryList()
        },
        // 分页器 设置当前第几页刷新
        handleCurrentChange (val) {
            console.log(val, 322222)
            this.listQuery.curPage = val
            this.queryList()
        },
        deleteData (index, data) {
            this.tabLoading = true
            delRoleData(data._id, data)
                .then((res) => {
                    this.tableData.splice(index, 1)
                    this.tabLoading = false
                })
                .catch((error) => {
                    this.tabLoading = false
                })
        },
        queryList () {
            // 查询表格数据
            this.tabLoading = true
            queryRoleData()
                .then((response) => {
                    this.tableData = response.data
                    // this.total = response.data.total;
                    this.tabLoading = false
                })
                .catch((error) => {
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
