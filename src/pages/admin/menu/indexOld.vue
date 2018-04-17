<template>
    <el-containter>
        <el-form
            :inline="true"
            :model="listQuery"
            label-width="85px"
            size="mini">
            <el-form-item label="菜单名称">
                <el-input v-model="listQuery.name"/>
            </el-form-item>
            <el-form-item label="所属模块">
                <el-select
                    v-model="typeValue"
                    :remote-method="getSelectData"
                    :loading="true"
                    filterable
                    default-first-option
                    remote
                    placeholder="请输入关键词">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-search"
                    size="mini"
                    @click="queryList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-plus"
                    size="mini"
                    @click="openDialog()">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="tabLoading"
            :data="tableData"
            size="mini"
            stripe
            border
            height="100%"
        >
            <el-table-column
                type="index"
                width="36"/>
            <!-- <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                            :data="props.row.file"
                            :header-cell-style="{textAlign: 'center'}"
                            stripe
                            border
                        >
                            <el-table-column
                                prop="name"
                                label="文件名称"
                                width="140"/>
                            <el-table-column
                                prop="descript"
                                label="文件描述"
                                width="120"/>
                            <el-table-column
                                prop="createDate"
                                label="文件上传日期"
                                width="180">
                                <template slot-scope="scope">
                                    <span>
                                        {{ scope.row.createDate| moment("YYYY-MM-DD HH:mm:ss") }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="enable"
                                label="是否可用" />
                        </el-table>
                    </template>
                </el-table-column> -->
            <el-table-column
                prop="name"
                label="菜单名称"
                width="180"/>
            <el-table-column
                prop="descript"
                label="菜单描述"/>
            <el-table-column
                prop="createDate"
                label="菜单创建日期"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.createDate| moment("YYYY-MM-DD HH:mm:ss") }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="system.descript"
                label="系统模块"
                width="180"/>
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
        <!-- <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="1000"
            layout="sizes, prev, pager, next"
            class="L-pag"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        /> -->
        <update-add-dailog
            v-bind="{isShow: showDialog, operation: operate, rowData: rowData}"
        />
    </el-containter>
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

    mounted () {
        this.queryList()
    },
    methods: {
        getSelectData (query) {
            if (query !== '') {
                this.inputLoading = true
            } else {
                this.typeOptions = this.remoteOptions
            }
        },
        openDialog (scope) {
            if (!scope) {
                this.operate = 'add'
            } else {
                this.operate = 'update'
                this.rowData = scope
            }
            this.showDialog = true
        },
        //  分页器 设置每页发送多少数据的方法
        handleSizeChange (val) {
            this.listQuery.pageSize = val
            this.queryList()
        },
        // 分页器 设置当前第几页刷新
        handleCurrentChange (val) {
            this.listQuery.curPage = val
            this.queryList()
        },
        deleteData (index, data) {
            this.tabLoading = true
            api.menu.delete({ param: { id: data._id }, data })
                .then(() => {
                    this.tableData.splice(index, 1)
                    this.tabLoading = false
                })
                .catch(() => {
                    this.tabLoading = false
                })
        },
        // 查询表格数据
        queryList () {
            this.tabLoading = true
            api.menu.query({ params: this.listQuery }).then((response) => {
                this.tableData = response.data
                // this.total = response.data.total;
                this.tabLoading = false
            }).catch(() => {
                this.tabLoading = false
            })
        },
    },
}
</script>

