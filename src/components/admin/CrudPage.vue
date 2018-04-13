<template>
    <el-container>
        <el-form
            :inline="true"
            size="mini">

            <slot name="queryItem"/>

            <el-form-item
                v-for="item in actionButton"
                :key="item.$index">
                <el-button
                    :icon="btn[item].icon"
                    type="text"
                    @click="btn[item]['event:click']">{{ btn[item].label }}</el-button>
            </el-form-item>

        </el-form>
        <el-table
            v-loading="loading"
            :data="data"
            :resizable="false"
            size="mini"
            stripe
            fixed
            border>

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
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    name: 'EditorTableDialog',
    props: {
        actionButton: {
            type: Array,
            default () {
                return ['Retrieve', 'Create', 'Update', 'Delete']
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
        }
    },
    methods: {
        open () {
            this.show = true
        },
        close () {
            this.show = false
        },
        Retrieve () {
            console.log(this.queryItem)
            this.$emit('query')
        },
        Create () {
            this.open()
        },
        Update () {
            this.open()
        },
        Delete () {
            this.$confirm('确认该条删除？', '提示', {
                type: 'warning',
            }).then(() => {

            }).catch(() => {

            })
        },
    },
}
</script>
