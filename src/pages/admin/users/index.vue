<template>
    <el-container>
        <el-form
            :inline="true"
            size="mini"
            label-width="100px">
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-search"
                    @click="handleQuery"
                >查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="text"
                    icon="el-icon-plus"
                    @click="handleAddRow"
                >添加</el-button>
            </el-form-item>
        </el-form>
        <editor-table
            :columns="tableCol"
            :data="tableData"
            @saveRow="handleSaveRow"
            @deleteRow="handleDeleteRow"
        />
    </el-container>
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
            tableCol: [
                { prop: 'username', label: '登录账号' },
                { prop: 'password', label: '登录密码' },
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
        handleAddRow () {
            this.tableData.push({})
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
                    body: row,
                }).then(() => {
                    row.inEditor = false
                })
            } else {
                API.user.add({ data: row }).then(() => {
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

