<template>
    <el-container>
        <el-table
            :data="apiList"
            border
            size="mini">

            <el-table-column
                :resizable="false"
                type="index"/>

            <el-table-column
                :resizable="false"
                label="名称"
                prop="name"/>

            <el-table-column
                :resizable="false"
                label="描述"
                prop="descript"/>

            <el-table-column
                :resizable="false"
                label="创建日期"
                prop="createDate"/>

            <el-table-column label="文档信息">
                <template slot-scope="scope">
                    <a
                        href="javascript:;"
                        @click="openProp(scope.row)">属性</a>
                    <a
                        href="javascript:;"
                        @click="openMethod(scope.row)">方法</a>
                    <a
                        href="javascript:;"
                        @click="openEvent(scope.row)">事件</a>
                </template>
            </el-table-column>
        </el-table>

        <prop-dialog
            v-if="showProp"
            :plugin="plugin"
            @close="showProp=false"/>

        <method-dialog
            v-if="showMethod"
            :plugin="plugin"
            @close="showMethod=false"/>

        <event-dialog
            v-if="showEvent"
            :plugin="plugin"
            @close="showEvent=false"/>
    </el-container>
</template>
<script>
import api from '@/api/admin'
import PropDialog from './prop-dialog'
import MethodDialog from './method-dialog'
import EventDialog from './event-dialog'

export default {
    components: { PropDialog, MethodDialog, EventDialog },
    data () {
        return {
            apiList: [],
            showProp: false,
            showMethod: false,
            showEvent: false,
            plugin: {},
        }
    },

    mounted () {
        this.query()
    },
    methods: {
        query () {
            api.apiDoc.query()
                .then((res) => {
                    this.apiList = res.data
                })
        },
        openProp (plugin) {
            this.showProp = true
            this.plugin = plugin
        },
        openMethod (plugin) {
            this.showMethod = true
            this.plugin = plugin
        },
        openEvent (plugin) {
            this.showEvent = true
            this.plugin = plugin
        },
    },
}
</script>
<style>

</style>

