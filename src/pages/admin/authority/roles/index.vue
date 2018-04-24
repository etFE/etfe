<template>
    <crud-page
        :columns="columns"
        :data="data"
        :query-item="queryItem"
        :loading="loading"
        @query="query"
        @open="open"
        @save="save"
        @remove="remove">

        <template slot="queryItem">
            <el-form-item
                label="角色名称">
                <el-input v-model="queryItem.name"/>
            </el-form-item>

            <el-form-item
                label="系统模块">
                <el-select
                    v-model="queryItem.system"
                    clearable
                    placeholder="请选择系统">
                    <el-option
                        v-for="item in systemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"/>
                </el-select>
            </el-form-item>
        </template>

        <template slot="editItem">
            <el-form
                ref="editForm"
                :inline="true"
                :model="model"
                :rules="rules"
                label-width="100px"
                size="mini">
                <el-row>
                    <el-form-item
                        prop="name"
                        label="菜单名称">
                        <el-input
                            v-model="model.name"
                            style="width:220px" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item
                        prop="systemId"
                        label="系统模块">
                        <el-select
                            v-model="model.systemId"
                            clearable
                            style="width:220px"
                            placeholder="请选择系统">
                            <el-option
                                v-for="item in systemList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"/>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="菜单描述">
                        <el-input
                            v-model="model.descript"
                            type="textarea"
                            style="width:220px"
                            resize="none"/>
                    </el-form-item>
                </el-row>
            </el-form>
        </template>

    </crud-page>
</template>

<script>
import api from '@/api/admin'
import CrudPage from '@/components/admin/CrudPage'

export default {
    components: {
        CrudPage,
    },
    data () {
        return {
            columns: [
                { name: 'name', label: '角色名称', width: 150 },
                { name: 'descript', label: '角色描述', minWidth: 400 },
                { name: 'system', label: '所属系统', width: 100, formatter: this.formatterSystem },
                { name: 'createDate', label: '创建日期', width: 300 },
            ],
            data: [],
            loading: false,
            queryItem: {
                name: null,
                system: null,
            },
            model: {},
            systemList: [],
            system: null,
            rules: {
                systemId: { required: true, message: '请选择系统模块', trigger: 'change' },
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
            },

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
        open (model) {
            this.model = model || {}
        },
        save (close) {
            const { id } = this.model
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    if (id) {
                        api.role.update({
                            param: { id },
                            data: { ...this.model, system: this.model.systemId },
                        }).then((response) => {
                            for (let i = 0; i < this.data.length; i += 1) {
                                if (this.data[i].id === id) {
                                    this.data.splice(i, 1, response.data)
                                    break
                                }
                            }
                            close()
                        })
                    } else {
                        api.role.add({
                            data: { ...this.model, system: this.model.systemId },
                        }).then((response) => {
                            this.data.push(response.data)
                            close()
                        })
                    }
                }
            })
        },
        remove (row) {
            const { _id } = row
            api.role.delete({
                param: {
                    id: _id,
                },
            }).then((response) => {
                for (let i = 0; i < this.data.length; i += 1) {
                    if (this.data[i]._id === response.data._id) {
                        this.data.splice(i, 1)
                        break
                    }
                }
            })
        },
        formatterSystem (row, col, cellValue, index) {
            return cellValue.name || row.systemId
        },
    },
}
</script>

