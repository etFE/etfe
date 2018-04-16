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
                label="部门">
                <el-input v-model="queryItem.department"/>
            </el-form-item>
        </template>

        <template slot="editItem">
            <el-form
                :inline="true"
                :model="model"
                size="mini"
                label-width="70px">
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="model.name"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="model.nick"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-select
                            v-model="model.sex"
                            style="width:185px;"
                            placeholder="请选择">
                            <el-option
                                :value="0"
                                label="男"/>
                            <el-option
                                :value="1"
                                label="女"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期">
                        <el-date-picker
                            v-model="model.birthday"
                            type="date"
                            size="mini"
                            style="width:185px;"
                            placeholder="选择日期"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input v-model="model.phone"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="model.email"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="现住址">
                        <el-input v-model="model.address"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="籍贯">
                        <el-input v-model="model.place"/>
                    </el-form-item>
                </el-col>
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
                { name: 'name', label: '姓名', width: 80 },
                { name: 'nick', label: '昵称', width: 80 },
                { name: 'sexStr', label: '性别', width: 60 },
                { name: 'age', label: '年龄', width: 60 },
                { name: 'phone', label: '电话', width: 100 },
                { name: 'email', label: '电子邮件', width: 150 },
                { name: 'addres', label: '现住址', minWidth: 200 },
                { name: 'place', label: '籍贯', minWidth: 200 },
            ],
            data: [],
            loading: false,
            model: {},
            queryItem: {
                department: null,
            },
        }
    },
    mounted () {
        this.query()
    },
    methods: {
        query () {
            this.loading = true
            api.person.query({ params: this.queryItem })
                .then((response) => {
                    this.data = response.data
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        open (model) {
            this.model = model
        },
        save () {
            const _id = this.model._id
            if (_id) {
                api.person.update({
                    param: {
                        id: _id,
                    },
                    data: this.model,
                }).then((response) => {
                    for (let i = 0; i < this.data.length; i += 1) {
                        if (this.data[i]._id === _id) {
                            this.data.splice(i, 1, response.data)
                            break
                        }
                    }
                })
            } else {
                api.person.add({
                    data: this.model,
                }).then((response) => {
                    this.data.push(response.data)
                })
            }
        },
        remove (row) {
            const { _id } = row
            api.person.delete({
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
    },
}
</script>

<style>

</style>
