<template>
    <section>
        <div class="L-selects">
            <el-form
                :inline="true"
                label-width="100px"
            >
                <el-form-item>
                    <el-button
                        type="text"
                        icon="el-icon-search"
                        size="small"
                        @click="handleQuery"
                    >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="text"
                        icon="el-icon-plus"
                        size="small"
                        @click="handleAddRow"
                    >添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <editor-table
            :columns="tableCol"
            :data="tableData"
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
            tableCol: [
                { prop: 'username', label: '登录账号' },
                { prop: 'password', label: '登录密码' },
                { prop: 'createDate', label: '创建时间', editable: false },
            ],
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

