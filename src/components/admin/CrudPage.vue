<template>
    <el-container>
        <el-form
            :inline="true"
            size="mini"
            label-width="100px">

            <slot name="queryItem"/>
            <div>
                <el-button
                    v-if="actionButton.Retrieve"
                    icon="el-icon-search"
                    size="mini"
                    type="text"
                    @click="Retrieve">查询</el-button>
                <el-button
                    v-if="actionButton.Create"
                    icon="el-icon-plus"
                    size="mini"
                    type="text"
                    @click="Create">添加</el-button>
                <el-button
                    v-if="actionButton.Update"
                    :disabled="!currentRow"
                    icon="el-icon-edit"
                    size="mini"
                    type="text"
                    @click="Update">修改</el-button>
                <el-button
                    v-if="actionButton.Delete"
                    :disabled="!currentRow"
                    icon="el-icon-delete"
                    size="mini"
                    type="text"
                    @click="Delete">删除</el-button>
            </div>
        </el-form>
        <el-table
            v-loading="loading"
            ref="table"
            :data="data"
            :resizable="false"
            size="mini"
            max-height="500"
            highlight-current-row
            stripe
            fixed
            border
            @current-change="changeRow">

            <el-table-column
                :resizable="false"
                fixed
                type="index"
                width="36"/>

            <el-table-column
                v-for="item in columns"
                :resizable="false"
                :key="item.$index"
                :prop="item.name"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :formatter="item.formatter"/>
        </el-table>
        <el-dialog
            v-if="show"
            :visible="true"
            :title="title"
            :close-on-click-modal="false"
            width="660px"
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
        loading: { type: Boolean, default () { return false } },
        queryItem: { type: Object, default () { return {} } },
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
            this.$emit('query')
        },
        save () {
            this.$emit('save', this.close)
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
            this.title = '编辑'
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
