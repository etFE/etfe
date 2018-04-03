<template>
  <section class="user-manage">
    <div class="L-selects">
      <el-form label-width="100px" :inline="true" :model="formData">
        <el-row>
          <!-- <el-col :span="6"> -->
            <el-form-item label="用户信息：">
              <el-input v-model="formData.name" size="medium"></el-input>
            </el-form-item>
          <!-- </el-col> -->
          <!-- <el-col :span="6"> -->
            <el-form-item label="用户类型：">
              <el-select v-model="typeValue" filterable default-first-option remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" size="medium">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <!-- </el-col> -->
          <!-- <el-col :span="3"> -->
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small" >查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
            </el-form-item>
          <!-- </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div class="L-grid">
      <el-table :data="tableData" stripe border style="height: 100%">
        <el-table-column prop="date" label="登录账号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="用户昵称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户类型">
        </el-table-column>
        <el-table-column prop="address" label="状态">
        </el-table-column>
        <el-table-column prop="address" label="IP地址">
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formData: {
        name: null
      },
      remoteOptions: [
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
      typeOptions: [],
      typeValue: [],
      loading: false
    };
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.typeOptions = this.remoteOptions.filter(item => {
            return item.text.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.typeOptions = this.remoteOptions;
      }
    }
  }
};
</script>

<style lang="scss">
.user-manage {
}
</style>
