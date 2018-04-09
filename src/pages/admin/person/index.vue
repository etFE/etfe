<template>
    <el-form
        :model="form"
        class="p-form"
        label-width="100px">
        <el-row
            type="flex"
            justify="center">
            <el-col :span="8"/>
            <el-col
                :span="10"
                style="min-width: 300px">
                <el-form-item label="登录账号:">
                    <el-input />
                </el-form-item>
                <el-form-item label="用户角色:">
                    <el-input />
                </el-form-item>
                <el-form-item label="职位:">
                    <el-input />
                </el-form-item>
                <el-form-item label="手机:">
                    <el-col :span="16">
                        <el-input />
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-col :span="16">
                        <el-input />
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row
            type="flex"
            justify="space-around">
            <el-form-item>
                <el-button
                    type="primary"
                >取消</el-button>
                <el-button>确定</el-button>
            </el-form-item>
        </el-row>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            form: '',
        }
    },
}
</script>

<style>
    .p-form {
        padding-top: 40px !important
    }
</style>
