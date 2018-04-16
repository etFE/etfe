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
                label="系统名称">
                <el-input v-model="queryItem.name"/>
            </el-form-item>

            <el-form-item
                label="创建日期">
                <el-input v-model="queryItem.createDate"/>
            </el-form-item>
        </template>

        <template slot="editItem">
            <el-form
                :inline="true"
                :model="model"
                label-width="70px"
                size="mini">
                <el-form-item label="系统名称">
                    <el-input
                        v-model="model.name"
                        style="width:220px" />
                </el-form-item>
                <br>
                <el-form-item label="系统描述">
                    <el-input
                        v-model="model.descript"
                        type="textarea"
                        style="width:220px"
                        resize="none"/>
                </el-form-item>
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
                { name: 'name', label: '系统名称', width: 200 },
                { name: 'descript', label: '系统描述', minWidth: 400 },
                { name: 'createDate', label: '创建日期', width: 300 },
            ],
            data: [],
            loading: false,
            model: {},
            queryItem: {
                name: null,
                createDate: null,
            },
        }
    },
    mounted () {
        this.query()
    },
    methods: {
        query () {
            this.loading = true
            api.system.query({ params: this.queryItem })
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
                api.system.update({
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
                api.system.add({
                    data: this.model,
                }).then((response) => {
                    this.data.push(response.data)
                })
            }
        },
        remove (row) {
            const { _id } = row
            api.system.delete({
                param: {
                    id: _id,
                },
            }).then((response) => {
                console.log(response.data)
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

