<template>
    <el-dialog
        :visible="true"
        :close-on-click-modal="false"
        width="80%"
        top="20px"
        title="属性列表"
        @close="close">
        <h2>{{ plugin.name }}</h2>
        <span>{{ plugin.descript }}</span>
        <edit-table
            :cols="cols"
            :data="data"
            @save="save"/>
    </el-dialog>
</template>
<script>
import api from '@/api/admin'
import EditTable from './editTable'

export default {
    name: 'PropDialog',
    components: { EditTable },
    props: {
        plugin: { type: Object, default: null },
    },
    data () {
        return {
            cols: [
                { name: 'name', label: '名称', width: 120 },
                { name: 'descript', label: '说明' },
                { name: 'type', label: '类型', width: 120 },
                { name: 'default', label: '默认值', width: 120 },
            ],
            data: [],
        }
    },
    mounted () {
        this.query()
    },
    methods: {
        query () {
            api.apiDoc.queryById({
                param: {
                    id: this.plugin.api,
                },
            }).then((res) => {
                this.data = res.data.props
            })
        },
        close () {
            this.$emit('close')
        },
        save () {
            api.apiDoc.update({
                param: {
                    id: this.plugin.api,
                },
                data: { props: this.data },
            }).then((res) => {
                this.$emit('close')
            })
        },
    },
}
</script>
<style>

</style>

