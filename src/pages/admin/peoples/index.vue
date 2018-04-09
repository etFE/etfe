<template>
    <el-container>
        <el-header>
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
                        icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="text"
                        icon="el-icon-plus">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :disabled="!currentRow"
                        type="text"
                        icon="el-icon-edit">修改</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="text"
                        icon="el-icon-delete">删除</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <el-table
                :data="personList"
                size="mini"
                height="500px"
                highlight-current-row
                border
                @current-change="handleCurrentChange">
                <el-table-column
                    type="selection"/>
                <el-table-column
                    type="index"/>
                <el-table-column
                    prop="name"
                    label="姓名"/>
                <el-table-column
                    prop="nick"
                    label="昵称"/>
                <el-table-column
                    prop="sex"
                    label="性别"/>
                <el-table-column
                    prop="age"
                    label="年龄"/>
                <el-table-column
                    prop="phone"
                    label="电话"/>
                <el-table-column
                    prop="email"
                    label="电子邮箱"/>
                <el-table-column
                    prop="address"
                    label="现住址"/>
                <el-table-column
                    prop="place"
                    label="籍贯"/>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            personList: [{}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
                         {}, {}, {}, {},
            ],
            currentRow: null,
        }
    },
    methods: {
        handleCurrentChange (val) {
            this.currentRow = val
        },
    },
}
</script>

<style>

</style>
