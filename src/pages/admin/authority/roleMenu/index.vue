<template>
    <el-container>
        <el-form
            :inline="true"
            label-width="100px"
            size="mini">

            <el-form-item
                label="系统模块">
                <el-select
                    v-model="queryItem.system"
                    placeholder="请选择系统"
                    clearable
                    @change="query">
                    <el-option
                        v-for="item in systemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"/>
                </el-select>
            </el-form-item>

        </el-form>
        <el-table
            v-loading="loading"
            ref="table"
            :data="data"
            :resizable="false"
            stripe
            fixed
            border
            size="mini">
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
            <el-table-column
                :resizeable="false"
                fixed="right"
                width="100"
                label="操作">
                <template slot-scope="scope">
                    <a
                        href="javascript:;"
                        @click="showMenu(scope.row)">配置菜单</a>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            v-if="show"
            :close-on-click-modal="false"
            :visible="true"
            width="540px"
            title="配置菜单"
            @close="show=false">
            <div style="padding-bottom:5px">
                <span>当前角色：</span>
                <el-tooltip
                    :content="currentRow.descript"
                    effect="dark"
                    placement="top-start">
                    <a href="javascript:;">{{ currentRow.name }}</a>
                </el-tooltip>
                <span style="margin-left:20px">所属系统：{{ currentRow.system.name }}</span>
            </div>
            <el-transfer
                v-model="roleMenu"
                :titles="['无权限访问','有权限访问']"
                :data="menuList"
                size="mini"/>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    size="mini"
                    @click="show=false">关闭</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="configMenu">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import api from '@/api/admin'

export default {
    components: {
    },
    data () {
        return {
            columns: [
                { name: 'name', label: '角色名称', width: 150 },
                { name: 'descript', label: '角色描述', minWidth: 200 },
                { name: 'system', label: '所属系统', width: 100, formatter: this.formatterSystem },
                { name: 'createDate', label: '创建日期', width: 200 },
            ],
            data: [],
            loading: false,
            queryItem: {
                system: null,
            },
            systemList: [],
            system: null,
            menuList: [],
            roleMenu: [],
            show: false,
            currentRow: null,
        }
    },
    mounted () {
        // table 数据
        this.query()
        // 下拉框数据
        this.querySystem()
    },
    methods: {
        query () {
            this.loading = true
            api.role.query({ params: this.queryItem })
                .then((response) => {
                    this.data = response.data
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        querySystem () {
            api.system.query()
                .then((response) => {
                    this.systemList = response.data
                })
                .catch(() => {

                })
        },
        queryMenu (system) {
            api.menu.query({ params: { system } })
                .then((response) => {
                    this.menuList = response.data.map(item => ({ key: item.id, label: item.name }))
                }).catch()
        },
        showMenu (row) {
            this.queryMenu(row.systemId)
            this.currentRow = row
            this.roleMenu = this.currentRow.menus
            this.show = true
        },
        configMenu () {
            const { id } = this.currentRow
            api.role.setMenu({
                param: { id },
                data: { menus: this.roleMenu },
            }).then((response) => {
                for (let i = 0; i < this.data.length; i += 1) {
                    if (this.data[i].id === id) {
                        this.data.splice(i, 1, response.data)
                        break
                    }
                }
                this.show = false
            }).catch()
        },
        formatterSystem (row, col, cellValue, index) {
            return cellValue.name || row.systemId
        },
    },
}
</script>

