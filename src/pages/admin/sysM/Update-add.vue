<template>
  <el-dialog :visible.sync="isShow" :before-close='dialogClosed' width="450px" @open="dialogOpened" :close-on-click-modal='false'>
    <span slot="title">{{title}}</span>
    <el-form :model="form" v-loading="formDataloading" ref="Form" :rules="rules" status-icon>
      <el-form-item label="系统名称：" :label-width="formLabelWidth" class="form-item" prop="name">
        <el-input v-model="form.name" auto-complete="off" size="medium" :disabled='disabled'></el-input>
      </el-form-item>
      <el-form-item label="系统描述：" :label-width="formLabelWidth" style="width: 350px;height: 68px" prop="descript">
        <el-input type="textarea" v-model="form.descript" size="medium"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClosed">取 消</el-button>
      <el-button type="primary" @click="submitDailog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSysData, updateSysData } from "@/api/admin/sysManage";

export default {
  name: "Update-add",
  props: ["isShow", "operation", "rowData"],
  data() {
    return {
      formLabelWidth: "95px",
      formDataloading: false,
      form: {},
      rules: {
        name: { required: true, message: "请输入文件名称", trigger: "blur" },
        descript: [
          { required: true, message: "请输入描述信息",trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符" }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.operation === "add") {
        return "添加页";
      } else {
        return "修改页";
      }
    },
    disabled() {
      if (this.operation === "add") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    dialogOpened() {
      if (this.rowData) {
        this.form = { ...this.form, ...this.rowData.row };
      } else {
        this.form = {};
      }
    },
    dialogClosed() {
      // 关闭前重置表单
      this.$emit("toggleShow");
      this.$parent.rowData = null;
      this.$refs.Form.resetFields();
    },
    submitDailog() {
      this.formDataloading = true;
      // 提交前先验证
      this.submitForm();
      const newData = { ...this.form };

      if (this.formDataloading) {
        if (this.operation === "add") {
          addSysData(newData)
            .then(res => {
              this.formDataloading = false;
              this.$parent.tableData.push(newData);
              this.dialogClosed();
            })
            .catch(error => {
              this.formDataloading = false;
            });
        } else {

          updateSysData(newData._id, newData)
            .then(res => {
              let index = this.rowData.$index;
              this.$parent.$set(this.$parent.tableData, index, newData);
              this.formDataloading = false;
              this.dialogClosed();
            })
            .catch(error => {
              this.formDataloading = false;
            });
        }
      }
    },
    submitForm() {
      this.$refs.Form.validate(valid => {
        if (!valid) {
          this.formDataloading = false;
        }
      });
    }
  }
};
</script>

<style>
.form-item {
  width: 300px;
}
</style>
