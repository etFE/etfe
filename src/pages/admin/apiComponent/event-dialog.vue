<template>
    <el-dialog
        :visible="true"
        :close-on-click-modal="false"
        width="80%"
        top="20px"
        title="事件列表"
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
    name: 'EventDialog',
    components: { EditTable },
    props: {
        plugin: { type: Object, default: null },
    },
    data () {
        return {
            cols: [
                { name: 'name', label: '名称', width: 120 },
                { name: 'descript', label: '说明' },
                { name: 'param', label: '参数', width: 120 },
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
                this.data = res.data.events
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
                data: { events: this.data },
            }).then((res) => {
                this.$emit('close')
            })
        },
    },
}
</script>
<style>

</style>

