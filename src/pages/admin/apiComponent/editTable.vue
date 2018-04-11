<template>
    <div>
        <el-button
            type="text"
            size="mini"
            @click="add">增加</el-button>
        <el-button
            type="text"
            size="mini"
            @click="save">提交</el-button>
        <el-table
            :data="data"
            size="mini"
            height="500"
            border
            @cell-click="cellClick">
            <el-table-column
                type="index"/>
            <el-table-column
                :resizable="false"
                align="center"
                width="50"
                label="显示">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.show"/>
                </template>
            </el-table-column>

            <template v-for="col in cols">

                <el-table-column
                    :key="col.name"
                    :label="col.label"
                    :resizable="false"
                    :width="col.width">
                    <template slot-scope="scope">
                        <input v-model="scope.row[col.name]">
                    </template>
                </el-table-column>

            </template>
            <el-table-column
                :resizable="false"
                align="center"
                width="50"
                cell-style="cursor:pointer"
                label="删除">
                <template slot-scope="scope">
                    <i
                        class="el-icon-error"
                        style="color:#F56C6C;cursor:pointer"
                        @click="remove(scope)"/>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
export default {
    name: 'EditTable',
    props: {
        data: { type: Array, default: null },
        cols: { type: Array, default: null },
    },
    methods: {
        add () {
            this.data.push({ show: true })
        },
        save () {
            this.$emit('save')
        },
        validateName () {

        },
        remove (scope) {
            this.data.splice(scope.$index, 1)
        },
        cellClick (row, col, value, e) {
            const input = e.target.getElementsByTagName('input').item(0)
            if (input) {
                input.focus()
            }
        },
    },
}
</script>
<style scoped>
input {
  height: 100%;
  width: 100%;
  border: 0;
  color: blue;
  font-size: 12px;
  background-color: transparent;
}
</style>

