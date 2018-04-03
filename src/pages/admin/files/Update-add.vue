<template>
  <el-dialog :visible.sync="isShow" :before-close='dialogClosed' @open="dialogOpened" width="450px" :close-on-click-modal='false'>
    <span slot="title">{{title}}</span>
    <el-form :model="form" v-loading="formDataloading" ref="Form" :rules="rules" status-icon>
      <el-form-item label="文件名称：" :label-width="formLabelWidth" class="form-item" prop="name">
        <el-input v-model="form.name" auto-complete="off" size="medium" :disabled='disabled'></el-input>
      </el-form-item>
      <!-- <el-form-item label="文件菜单：" :label-width="formLabelWidth" class="form-item">
        <el-select v-model="form.menus" filterable default-first-option remote placeholder="请输入关键词" size="medium">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="过期日期：" :label-width="formLabelWidth" class="form-item" prop="expireDate">
        <el-date-picker v-model="form.expireDate" type="datetime" placeholder="选择过期日期时间" size="medium">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否可用：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.enable">
          <el-radio :label=1>是</el-radio>
          <el-radio :label=0>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文件描述：" :label-width="formLabelWidth" style="width: 350px;height: 68px" prop="descript">
        <el-input type="textarea" v-model="form.descript"  size="medium"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="path">
        <el-upload class="upload-demo" ref="upload"  :on-success="filesUpLoaded" :on-error="filesUnloaded" action="http://192.168.1.127:3000/manage/file/upload" :file-list="fileList" :show-file-list='true'  :auto-upload="true" :multiple='false'>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClosed">取 消</el-button>
      <el-button type="primary" @click="submitDailog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addFileData, updateFileData } from "@/api/admin/filesManage";

export default {
  name: "Update-add",
  props: ["isShow", "operation","rowData"],
  data() {
    return {
      formLabelWidth: "95px",
      formDataloading: false,
      form: {
        enable: 1
      },
      fileList: [
        ],
      typeOptions: [
        {
          text: "HTML",
          value: "HTML"
        },
        {
          text: "css",
          value: "css"
        },
        {
          text: "JavaScript",
          value: "JavaScript"
        }
      ],
      // 验证规则
      rules: {
        name: { required: true, message: "请输入文件名称", trigger: "blur" },
        expireDate: { required: true, message: "请输入过期日期", trigger: "blur" },
        // path: {required: true, message: "请上传文件"},
        descript: [
          { required: true, message: '请输入描述信息' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符' }
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
        this.form = {
          enable: 1
        };
      }
    },
    dialogClosed() {
      this.$refs.Form.resetFields();
      this.$parent.rowData = null;
      this.$emit("toggleShow");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitDailog() {
      this.formDataloading = true;
      // 上传文件
      // this.submitUpload();
      // 提交前先验证
      this.submitForm();

      const newData = { ...this.form };

      if (this.formDataloading) {
        if (this.operation === "add") {
          addFileData(newData)
            .then(res => {
              this.formDataloading = false;
              this.$parent.tableData.push(res.data);
              this.dialogClosed();
            })
            .catch(error => {
              this.formDataloading = false;
            });
        } else {

          updateFileData(newData._id, newData)
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
    },
    filesUpLoaded (path) {
      console.log('uploaded success')
      this.form.path = path
    },
    filesUnloaded () {
      console.log('filesloaded error')
    }
  }
};
</script>

<style>
.form-item {
  width: 300px;
}
</style>
