<template>
    <el-table
        :data="data"
        stripe
        border
        size="mini"
        style="height: 100%; width:100%;"
        class="et-editortable-container">
        <el-table-column
            width="36"
            type="index"
        />
        <el-table-column
            v-for="col in columns"
            :key="col.prop"
            :label="col.label"
            :width="col.width">
            <template slot-scope="scope">
                <input
                    v-if="scope.row.inEditor && col.editable !== false"
                    v-model="scope.row[col.prop]"
                    class="et-ineditor-input"
                    type="text"
                >
                <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    v-if="!scope.row.inEditor"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button
                    v-else
                    size="mini"
                    type="primary"
                    @click="handleSave(scope.$index, scope.row)">
                    保存
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'EditorTable',
    props: {
        columns: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleEdit (index, row) {
            this.$set(row, 'inEditor', true)
        },
        handleSave (index, row) {
            // 保存 api =》 then
            this.$emit('saveRow', index, row)
        },
        handleDelete (index, row) {
            // confirm
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 删除 api =》 then
                if (row._id) {
                    this.$emit('deleteRow', index, row)
                } else {
                    this.data.splice(index, 1)
                }
            }).catch(() => {})
        },
    },
}
</script>

<style lang="scss">
.et-editortable-container {

    .et-ineditor-input {
        background: transparent;
        color: $themeColor;
        border: none;
        // border: 1px solid $borderColor;
        // padding: 6px;
        // width: 100%;
        // box-sizing: border-box;
    }
}
</style>
