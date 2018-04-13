<template>
    <div>
        <div>
            <el-button
                type="text"
                icon="el-icon-search"
                size="small"
                @click="handleQuery"
            >查询</el-button>
            <el-button
                type="text"
                icon="el-icon-plus"
                size="small"
                @click="handleAddRow"
            >添加</el-button>
        </div>
        <el-table
            :data="data"
            stripe
            border
            size="mini"
            style="height: 100%; width:100%;"
            class="et-editortable-container"
        >
            <el-table-column
                type="index"
            />
            <el-table-column
                v-for="col in columns"
                :key="col.prop"
                :label="col.label"
                :width="col.width"
            >
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
            <el-table-column
                label="操作"
                width="150"
            >
                <template slot-scope="scope">
                    <el-button
                        v-if="!scope.row.inEditor"
                        size="mini"
                        class="et-editortable-minibutton"
                        @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        v-else
                        size="mini"
                        type="primary"
                        class="et-editortable-minibutton"
                        @click="handleSave(scope.$index, scope.row)">
                        保存
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        class="et-editortable-minibutton"
                        @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
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
        // 查询
        handleQuery () {
            this.$emit('queryData')
        },
        // 添加
        handleAddRow () {
            this.data.push({ inEditor: true })
        },
        // 保存
        handleSave (index, row) {
            this.$emit('saveRow', index, row)
        },
        // 删除
        handleDelete (index, row) {
            if (row._id) {
                this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$emit('deleteRow', index, row)
                }).catch(() => {})
            } else {
                this.data.splice(index, 1)
            }
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

    .et-editortable-minibutton {
        padding: 4px 10px;
    }
}
</style>
