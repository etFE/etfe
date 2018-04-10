<template>
    <section>
        <div class="L-selects">
            <el-form
                :inline="true"
                :model="listQuery"
                label-width="85px"
                @submit.native.prevent>
                <el-row>
                    <el-form-item label="文件名称：">
                        <el-input
                            v-model="listQuery.name"
                            size="medium"
                            @keyup.enter.native="queryList" />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            size="small"
                            @click="queryList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                            ref="upload"
                            :before-upload="beforeUpload"
                            :on-progress="progress"
                            :on-success="filesUpLoaded"
                            :on-error="filesUnloaded"
                            :show-file-list="true"
                            :auto-upload="true"
                            :multiple="true"
                            class="upload-demo"
                            action="http://118.178.184.131:3000/manage/file/upload"
                        >
                            <el-button
                                slot="trigger"
                                :disabled="uploading"
                                size="small"
                                type="primary"
                            >
                                选取文件
                            </el-button>
                        </el-upload>
                    </el-form-item>
                </el-row>
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
                    label="文件名称"
                    width="180" />
                <el-table-column
                    prop="descript"
                    label="文件描述"
                    width="180">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input
                                v-model="scope.row.descript"
                                type="text" />
                        </template>
                        <span v-else>{{ scope.row.descript }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="enable"
                    label="是否可用"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <el-checkbox
                            v-model="scope.row.enable"
                            :true-label="1"
                            :false-label="0"
                            :disabled="!scope.row.edit" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="文件上传日期"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createDate| moment("YYYY-MM-DD HH:mm:ss") }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    min-width="180">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.edit"
                            icon="el-icon-circle-check-outline"
                            type="success"
                            size="small"
                            @click="confirmData(scope.row)">保存</el-button>
                        <el-button
                            v-else
                            :disabled="tabBtnDisabled"
                            icon="el-icon-edit"
                            size="small"
                            type="primary"
                            @click="editData(scope.row)">编辑</el-button>
                        <el-button
                            size="small"
                            icon="el-icon-delete"
                            type="danger"
                            @click="deleteData(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="1000"
            class="L-pag"
            background
            layout="sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </section>
</template>

<script>
import api from '@/api/admin'

export default {
    data () {
        return {
            uploading: false,
            tabBtnDisabled: false,
            tableData: [],
            tabParam: {},
            // 表格查询参数
            listQuery: {
                name: '',
                // curPage: 1,
                // pageSize: 20,
                // importance: undefined,
                // title: undefined,
                // type: undefined,
            },
            remoteSelectOptions: [
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
        confirmData (row) {
            this.tabBtnDisabled = false
            this.$delete(row, 'edit')
            const newData = { ...row }

            api.file.update({ param: { id: newData._id }, data: newData })
        },
        editData (row) {
            this.$set(row, 'edit', true)
            this.tabBtnDisabled = true
        },
        selectGetData (query) {
            if (query !== '') {
                this.inputLoading = true
            } else {
                this.typeOptions = this.remoteSelectOptions
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
            api.file.delete({ param: { id: data._id }, data })
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
            api.file.query({ params: this.listQuery })
                .then((response) => {
                    this.tableData = response.data
                    this.tabLoading = false
                })
                .catch(() => {
                    this.tabLoading = false
                })
        },
        changeDialogState () {
            this.showDialog = false
        },
        beforeUpload () {
        },
        progress () {
        },
        filesUpLoaded (res) {
            let newData = []
            if (!res.data) {
                this.$message({
                    message: res.message,
                    type: 'error',
                })
                return false
            }
            newData = res.data


            this.tableData.push(newData)
            // this.form.path = path;
        },
        filesUnloaded () {
            console.log('filesloaded error')
        },
    },
}
</script>

<style lang="scss">

</style>
