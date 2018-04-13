<template>
    <section>
        <el-form
            :inline="true"
            :model="queryForm"
            size="mini"
            label-width="100px"
        >
            <el-form-item label="账号">
                <el-input v-model="queryForm.username"/>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="queryForm.nick"/>
            </el-form-item>
        </el-form>
        <editor-table
            :columns="tableCol"
            :data="tableData"
            @queryData="handleQuery"
            @saveRow="handleSaveRow"
            @deleteRow="handleDeleteRow"
        />
    </section>
</template>

<script>
import EditorTable from '@/components/admin/EditorTable'
import API from '@/api/admin'

export default {
    components: {
        EditorTable,
    },
    data () {
        return {
            queryForm: {
                username: '',
                nick: '',
            },
            tableCol: [
                { prop: 'username', label: '登录账号' },
                { prop: 'password', label: '登录密码' },
                { prop: 'nick', label: '昵称' },
                { prop: 'avater', label: '头像', editable: false },
                { prop: 'createDate', label: '创建时间', editable: false },
            ],
            // TODO: 注意 这里 如果数据没有请求成功，，为空的判断
            tableData: [],
        }
    },
    mounted () {
        this.handleQuery()
    },
    methods: {
        handleQuery () {
            API.user.query().then((res) => {
                this.tableData = res.data
            })
        },
        handleSaveRow (index, row) {
            if (!row.username) {
                this.$message({
                    message: '用户名必填',
                    type: 'error',
                })
                return
            }
            if (row._id) {
                API.user.update({
                    param: { id: row._id },
                    data: row,
                }).then((res) => {
                    Object.assign(row, res.data)
                    row.inEditor = false
                })
            } else {
                API.user.add({ data: row }).then((res) => {
                    Object.assign(row, res.data)
                    row.inEditor = false
                })
            }
        },
        handleDeleteRow (index, row) {
            API.user.delete({ param: { id: row._id } }).then(() => {
                row.inEditor = false
                this.tableData.splice(index, 1)
            })
        },
    },
}
</script>

