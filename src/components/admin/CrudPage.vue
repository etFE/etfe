<template>
    <el-container>
        <el-form
            :inline="true"
            size="mini">

            <slot name="queryItem"/>

            <el-form-item>
                <el-button
                    v-if="actionButton.Retrieve"
                    icon="el-icon-search"
                    type="text"
                    @click="Retrieve">查询</el-button>
                <el-button
                    v-if="actionButton.Create"
                    icon="el-icon-plus"
                    type="text"
                    @click="Create">添加</el-button>
                <el-button
                    v-if="actionButton.Update"
                    :disabled="!currentRow"
                    icon="el-icon-edit"
                    type="text"
                    @click="Update">修改</el-button>
                <el-button
                    v-if="actionButton.Delete"
                    :disabled="!currentRow"
                    icon="el-icon-delete"
                    type="text"
                    @click="Delete">删除</el-button>
            </el-form-item>

        </el-form>
        <el-table
            v-loading="loading"
            ref="table"
            :data="data"
            :resizable="false"
            size="mini"
            highlight-current-row
            stripe
            fixed
            border
            @current-change="changeRow">

            <el-table-column
                type="index"
                width="36"/>

            <el-table-column
                v-for="item in columns"
                :key="item.$index"
                :prop="item.name"
                :label="item.label"/>
        </el-table>
        <el-dialog
            v-if="show"
            :visible="true"
            :title="title"
            @close="close">
            <slot name="editItem"/>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    size="mini"
                    @click="close">关闭</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="save">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    name: 'EditorTableDialog',
    props: {
        actionButton: {
            type: Object,
            default () {
                return {
                    Retrieve: true,
                    Create: true,
                    Update: true,
                    Delete: true,
                }
            },
        },
        columns: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        queryItem: { type: Object, default: null },
        loading: { type: Boolean, default () { return false } },
    },
    data () {
        const create = this.Create
        const retrieve = this.Retrieve
        const update = this.Update
        const del = this.Delete
        return {
            show: false,
            btn: {
                Retrieve: { label: '查询', icon: 'el-icon-search', 'event:click': retrieve },
                Create: { label: '添加', icon: 'el-icon-plus', 'event:click': create },
                Update: { label: '修改', icon: 'el-icon-search', 'event:click': update },
                Delete: { label: '删除', icon: 'el-icon-search', 'event:click': del },
            },
            title: '编辑',
            currentRow: null,
            model: {},
        }
    },
    methods: {
        open () {
            this.show = true
        },
        close () {
            this.show = false
        },
        changeRow (val) {
            this.currentRow = val
        },
        Retrieve () {
            console.log(this.queryItem)
            this.$emit('query')
        },
        save () {
            this.$emit('save')
            this.close()
        },
        Create () {
            this.open()
            this.model = {}
            this.currentRow = null
            this.$refs.table.setCurrentRow()
            this.title = '添加'
            this.$emit('open', this.model)
        },
        Update () {
            this.open()
            this.model = Object.assign({}, this.currentRow)
            this.dialogTitle = '编辑'
            this.$emit('open', this.model)
        },
        Delete () {
            this.$confirm('确认删除该条数据？', '提示', {
                type: 'warning',
            }).then(() => {
                this.$emit('remove', this.currentRow)
            }).catch(() => {

            })
        },
    },
}
</script>
