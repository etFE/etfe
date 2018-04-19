<template>
    <el-container>
        <el-form
            :inline="true"
            label-width="100px"
            size="mini">

            <el-form-item label="账号名称">
                <el-input v-model="queryItem.username"/>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="queryItem.nick"/>
            </el-form-item>
            <div>
                <el-button
                    icon="el-icon-search"
                    size="mini"
                    type="text"
                    @click="query">查询</el-button>
            </div>
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
                        @click="showRole(scope.row)">配置角色</a>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            v-if="show"
            :close-on-click-modal="false"
            :visible="true"
            width="540px"
            title="分配角色"
            @close="show=false">
            <div style="padding-bottom:5px">
                <span>当前用户：</span>
                <a href="javascript:;">{{ currentRow.username }}</a>
            </div>
            <el-transfer
                v-model="userRole"
                :titles="['其他角色','当前角色']"
                :data="roleList"
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
                    @click="configRole">保存</el-button>
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
                { name: 'username', label: '用户账号' },
                { name: 'nick', label: '昵称' },
                { name: 'createDate', label: '创建日期' },
            ],
            data: [],
            loading: false,
            queryItem: {
                username: null,
                nick: null,
            },
            roleList: [],
            userRole: [],
            show: false,
            currentRow: null,
        }
    },
    mounted () {
        // table 数据
        this.query()
    },
    methods: {
        query () {
            this.loading = true
            api.user.query({ params: this.queryItem })
                .then((response) => {
                    this.data = response.data
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        queryRole () {
            api.role.query()
                .then((response) => {
                    this.roleList = response.data.map(item => ({ key: item.id, label: `系统:${item.system.name}-${item.name} ` }))
                })
        },
        showRole (row) {
            this.queryRole()
            this.currentRow = row
            this.userRole = this.currentRow.roles
            this.show = true
        },
        configRole () {
            const { id } = this.currentRow
            api.user.setRole({
                param: { id },
                data: { roles: this.userRole },
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
    },
}
</script>

