<template>
    <el-container>
        <el-form
            :inline="true"
            size="mini">
            <el-form-item>
                <el-button
                    type="text"
                    class="el-icon-plus"
                    @click="add">添加</el-button>
            </el-form-item>

            <el-form-item label="选择组件">
                <el-select
                    v-model="menuValue"
                    :clearable="true">
                    <el-option
                        v-for="item in menuList"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"/>
                </el-select>
            </el-form-item>
        </el-form>

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
            menuList: [],
            menuValue: null,
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
            api.apiDoc.queryEmptyMenu()
                .then((res) => {
                    this.menuList = res.data
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
        add () {
            api.apiDoc.add({
                data: { menuId: this.menuValue },
            }).then((res) => {
                // 添加一条数据
                this.apiList.push(res.data)
                // 删除一条菜单
                for (let i = 0; i < this.menuList.length; i += 1) {
                    const menu = this.menuList[i]
                    if (menu._id === res.data._id) {
                        this.menuList.splice(i, 1)
                        this.menuValue = null
                    }
                }
            })
        },
    },
}
</script>
<style>

</style>

